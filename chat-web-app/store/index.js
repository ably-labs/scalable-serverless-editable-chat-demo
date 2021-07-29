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
        incomingChat: "incoming-chat"
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
      chatMessagesArr: []
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
      getChatMessagesArr: state => state.chatMessagesArr
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
      }
    },

    actions: {
      //Ably init
      instantiateAbly(vueContext, { username }) {
        vueContext.commit(
          "setAblyClientId",
          "clientId-" +
            Math.random()
              .toString(36)
              .substr(2, 16)
        );

        const ablyInstance = new Ably.Realtime({
          key: process.env.ABLY_API_KEY,
          clientId: this.state.ablyClientId,
          echoMessages: false
        });
        console.log("my client id", this.state.ablyClientId);
        ablyInstance.connection.once("connected", () => {
          vueContext.commit("setAblyConnectionStatus", true);
          vueContext.commit("setAblyRealtimeInstance", ablyInstance);
          vueContext.commit("setUsername", username);
          vueContext.dispatch("attachToAblyChannels");
          vueContext.dispatch("subscribeToAblyPresence");
          vueContext.dispatch("enterClientInAblyPresenceSet");
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

      subscribeToChannels({ state, dispatch }) {
        state.channelInstances.incomingChat.subscribe(msg => {
          state.chatMessagesArr.push(JSON.parse(msg.data).row);
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
        console.log("entering");
        this.state.channelInstances.outgoingChat.presence.enter({
          username: this.state.username
        });
      },
      publishMyChatMsgToAbly({ state }, chatMsg) {
        state.channelInstances.outgoingChat.publish("chatMsg", {
          username: state.username,
          content: chatMsg
        });
      }
    }
  });
};

export default createStore;
