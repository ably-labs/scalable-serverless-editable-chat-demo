export default {
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
  onlineMembersArray: [],
  chatMessagesArray: [],
  msgArrayUpdateType: "new"
};
