import * as Ably from "ably";

export default {
  // init an ably realtime instance using token auth
  instantiateAbly(vueContext) {
    const ablyInstance = new Ably.Realtime({
      authUrl:
        "https://serverless-scalable-chat.netlify.app/.netlify/functions/ably-auth",
      echoMessages: false
    });

    // when ably is successfully connected, set state variables and call methods to attach to various channels and subscribe to the presence set
    ablyInstance.connection.once("connected", () => {
      vueContext.commit("setAblyClientId", ablyInstance.auth.clientId);
      vueContext.commit("setAblyConnectionStatus", true);
      vueContext.commit("setAblyRealtimeInstance", ablyInstance);
      vueContext.dispatch("initAblyChannels");
      vueContext.dispatch("subscribeToAblyPresence");
    });
  },
  // attach to the incoming and outgoing channels
  initAblyChannels(vueContext) {
    const outgoingCh = this.state.ablyRealtimeInstance.channels.get(
      this.state.channelNames.outgoingChat
    );

    const incomingCh = this.state.ablyRealtimeInstance.channels.get(
      this.state.channelNames.incomingChat
    );

    vueContext.commit("setAblyChannelInstances", { outgoingCh, incomingCh });

    vueContext.dispatch("subscribeToChannels");
  },

  // subscribe to the incoming and outgoing channel instances
  subscribeToChannels({ commit, state }) {
    state.channelInstances.incomingChat.subscribe(msg => {
      let msgPayload = JSON.parse(msg.data);
      let operationPerformed = msgPayload.type;

      /* check if the update is about a new message being inserted or an existing message being edited */
      if (operationPerformed == "INSERT") {
        // set the update type to new, so we can scroll the message list to bottom
        commit("setChatMsgArrayUpdateType", "new");
        state.chatMessagesArray.push(msgPayload.row);
      } else if (operationPerformed == "UPDATE") {
        // set the update type to edit, find and update the array object with new data
        commit("setChatMsgArrayUpdateType", "edit");
        let msgObjToEdit = state.chatMessagesArray.find(
          msg => msg.msg_id == msgPayload.row.msg_id
        );
        msgObjToEdit.msg_data = msgPayload.row.msg_data;
        msgObjToEdit.is_edited = msgPayload.row.is_edited;
      }
    });
  },

  //subscribe to ably presence updates on the outgoing channel
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

    // get a list of members already present in the ably presence list
    this.state.channelInstances.outgoingChat.presence.get(
      (err, presenceList) => {
        for (const member in presenceList) {
          vueContext.dispatch("handleNewMemberEntered", presenceList[member]);
        }
      }
    );
  },

  // handle a new member entering the ably presence set
  handleNewMemberEntered(vueContext, member) {
    vueContext.commit("setPresenceIncrement");
    vueContext.commit("setOnlineMembersArrayInsert", {
      id: member.clientId,
      username: member.data.username
    });
  },

  // handle an existing member entering the ably presence set
  handleExistingMemberLeft(vueContext, member) {
    vueContext.commit("setOnlineMembersArrayRemove", member.id);
    vueContext.commit("setPresenceDecrement");
  },

  // enter the current client in the ably presence set
  enterClientInAblyPresenceSet(vueContext) {
    this.state.channelInstances.outgoingChat.presence.enter({
      username: this.state.username
    });
  },

  // global method to publish a chat message on the outgoing channel instance
  publishMyChatMsgToAbly({ state }, chatMsg) {
    state.channelInstances.outgoingChat.publish("chatMsg", {
      username: state.username,
      content: chatMsg
    });
  },

  // global method to publish an edit update on the outgoing channel instance
  publishMyEditedMsgToAbly({ state }, { editedMsg, msgIdToEdit }) {
    state.channelInstances.outgoingChat.publish("editedMsg", {
      username: state.username,
      content: editedMsg,
      msgIdToEdit: msgIdToEdit
    });
  }
};
