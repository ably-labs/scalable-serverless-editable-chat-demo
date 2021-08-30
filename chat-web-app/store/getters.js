export default {
  getOutgoingChInstance: state => state.channelInstances.outgoingChat,
  getIncomingChInstance: state => state.channelInstances.incomingChat,
  getOutgoingChMessage: state => state.channelMessages.outgoingChatMsg,
  getIncomingChMessage: state => state.channelMessages.incomingChatMsg,
  getIsAblyConnectedStatus: state => state.isAblyConnected,
  getPresenceCount: state => state.presenceCount,
  getUsername: state => state.username,
  getMyClientId: state => state.ablyClientId,
  getOnlineMembersArray: state => state.onlineMembersArray,
  getChatMessagesArray: state => state.chatMessagesArray,
  getIsUsernameEntered: state => state.username != null,
  getChatMessagesArrayUpdateType: state => state.msgArrayUpdateType
};
