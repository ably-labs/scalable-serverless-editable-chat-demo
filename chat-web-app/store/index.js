import Vuex from "vuex";
import * as Ably from "ably";

const createStore = () => {
  return new Vuex.Store({
    state: {
      ablyRealtimeInstance: null,
      isAblyConnected: false,
      ablyClientId: null,
      channelNames: {
        outgoingChat: "outgoing-chat",
        incomingChat: "[?rewind=2m]incoming-chat"
      },
      channelInstances: {
        outgoingChat: null,
        incomingChat: null
      },
      channelMessages: {
        outgoingChatMsg: null,
        incomingChatMsg: null
      },
      username: null,
      presenceCount: 0,
      onlineMembersArr: [],
      chatMessagesArr: [],
      msgArrUpdateType: "new"
    },
    getters: {
      getOutgoingChInstance: state => state.channelInstances.outgoingChat,
      getIncomingChInstance: state => state.channelInstances.incomingChat,
      getOutgoingChMessage: state => state.channelMessages.outgoingChatMsg,
      getIncomingChMessage: state => state.channelMessages.incomingChatMsg,
      getIsAblyConnectedStatus: state => state.isAblyConnected,
      getPresenceCount: state => state.presenceCount,
      getUsername: state => state.username,
      getMyClientId: state => state.ablyClientId,
      getOnlineMembersArr: state => state.onlineMembersArr,
      getChatMessagesArr: state => state.chatMessagesArr,
      getIsUsernameEntered: state => state.username != null,
      getChatMessagesArrUpdateType: state => state.msgArrUpdateType
    },

    mutations: {
      setAblyRealtimeInstance(state, ablyInstance) {
        state.ablyRealtimeInstance = ablyInstance;
      },
      setAblyConnectionStatus(state, status) {
        state.isAblyConnected = status;
      },
      setAblyClientId(state, id) {
        state.ablyClientId = id;
      },
      setUsername(state, username) {
        state.username = username;
      },
      setAblyChannelInstances(state, { outgoingCh, incomingCh }) {
        state.channelInstances.outgoingChat = outgoingCh;
        state.channelInstances.incomingChat = incomingCh;
      },
      setPresenceCount(state, count) {
        state.presenceCount = count;
      },
      setPresenceIncrement(state) {
        state.presenceCount++;
      },
      setPresenceDecrement(state) {
        state.presenceCount--;
      },
      setOnlineMembersArrInsert(state, memberObj) {
        state.onlineMembersArr.push(memberObj);
      },
      setOnlineMembersArrRemoval(state, clientId) {
        state.onlineMembersArr.splice(
          state.onlineMembersArr.findIndex(
            presenceEntry => presenceEntry.id === clientId
          ),
          1
        );
      },
      setChatMsgArrUpdateType(state, updateType) {
        state.msgArrUpdateType = updateType;
      }
    },

    actions: {
      //Ably init
      instantiateAbly(vueContext) {
        const ablyInstance = new Ably.Realtime({
          authUrl:
            "https://serverless-scalable-chat.netlify.app/.netlify/functions/ably-auth",
          echoMessages: false
        });

        ablyInstance.connection.once("connected", () => {
          vueContext.commit("setAblyClientId", ablyInstance.auth.clientId);
          vueContext.commit("setAblyConnectionStatus", true);
          vueContext.commit("setAblyRealtimeInstance", ablyInstance);
          vueContext.dispatch("attachToAblyChannels");
          vueContext.dispatch("subscribeToAblyPresence");
        });
      },
      attachToAblyChannels(vueContext) {
        const outgoingCh = this.state.ablyRealtimeInstance.channels.get(
          this.state.channelNames.outgoingChat
        );

        const incomingCh = this.state.ablyRealtimeInstance.channels.get(
          this.state.channelNames.incomingChat
        );

        vueContext.commit("setAblyChannelInstances", {
          outgoingCh,
          incomingCh
        });

        vueContext.dispatch("subscribeToChannels");
      },

      subscribeToChannels({ commit, state, dispatch }) {
        state.channelInstances.incomingChat.subscribe(msg => {
          let msgPayload = JSON.parse(msg.data);
          let operationPerformed = msgPayload.type;
          if (operationPerformed == "INSERT") {
            commit("setChatMsgArrUpdateType", "new");
            state.chatMessagesArr.push(msgPayload.row);
          } else if (operationPerformed == "UPDATE") {
            commit("setChatMsgArrUpdateType", "edit");
            let msgObjToEdit = state.chatMessagesArr.find(
              msg => msg.msg_id == msgPayload.row.msg_id
            );
            msgObjToEdit.msg_data = msgPayload.row.msg_data;
            msgObjToEdit.is_edited = msgPayload.row.is_edited;
          }
        });
      },
      subscribeToAblyPresence(vueContext) {
        this.state.channelInstances.outgoingChat.presence.subscribe(
          "enter",
          msg => {
            console.log("Entered", msg);

            vueContext.dispatch("handleNewMemberEntered", msg);
          }
        );
        this.state.channelInstances.outgoingChat.presence.subscribe(
          "leave",
          msg => {
            console.log("Left", msg);
            vueContext.dispatch("handleExistingMemberLeft", msg);
          }
        );
        this.state.channelInstances.outgoingChat.presence.get(
          (err, presenceList) => {
            for (const member in presenceList) {
              vueContext.dispatch(
                "handleNewMemberEntered",
                presenceList[member]
              );
            }
          }
        );
      },
      handleNewMemberEntered(vueContext, member) {
        vueContext.commit("setPresenceIncrement");
        vueContext.commit("setOnlineMembersArrInsert", {
          id: member.clientId,
          username: member.data.username
        });
      },
      handleExistingMemberLeft(vueContext, member) {
        vueContext.commit("setOnlineMembersArrRemoval", member.id);
        vueContext.commit("setPresenceDecrement");
      },
      enterClientInAblyPresenceSet(vueContext) {
        this.state.channelInstances.outgoingChat.presence.enter({
          username: this.state.username
        });
      },
      publishMyChatMsgToAbly({ state }, chatMsg) {
        state.channelInstances.outgoingChat.publish("chatMsg", {
          username: state.username,
          content: chatMsg
        });
      },
      publishMyEditedMsgToAbly({ state }, { editedMsg, msgIdToEdit }) {
        state.channelInstances.outgoingChat.publish("editedMsg", {
          username: state.username,
          content: editedMsg,
          msgIdToEdit: msgIdToEdit
        });
      }
    }
  });
};

export default createStore;
