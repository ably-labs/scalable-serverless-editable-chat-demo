export default {
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
  setOnlineMembersArrayInsert(state, memberObj) {
    state.onlineMembersArray.push(memberObj);
  },
  setOnlineMembersArrayRemove(state, clientId) {
    state.onlineMembersArray.splice(
      state.onlineMembersArray.findIndex(
        presenceEntry => presenceEntry.id === clientId
      ),
      1
    );
  },
  setChatMsgArrayUpdateType(state, updateType) {
    state.msgArrayUpdateType = updateType;
  }
};
