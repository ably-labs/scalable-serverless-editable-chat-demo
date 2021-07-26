<template>
  <div class="grid text-gray-200 font-sans max-h-screen">
    <LeftNavBar class="left-navbar" />
    <TopBar class="topbar" />
    <ChatDetails class="chat-details" />
    <ChatHeader class="chat-header" />
    <ChatMessagesContainer class="chat-messages-container" />
    <ChatInput class="chat-input" />
    <LiveInfo class="live-info" />
  </div>
</template>

<style>
.grid {
  display: grid;
  grid-template-rows: 100px 1fr 10fr 1fr;
  grid-template-columns: 100px 1fr 3fr 2fr;
  grid-template-areas:
    "left-navbar topbar topbar topbar"
    "left-navbar chat-details chat-header live-info"
    "left-navbar chat-details chat-messages-container live-info"
    "left-navbar chat-details chat-input live-info";
  height: 100vh;
}

.left-navbar {
  grid-area: left-navbar;
}

.topbar {
  grid-area: topbar;
}
.chat-header {
  grid-area: chat-header;
}
.chat-details {
  grid-area: chat-details;
}

.live-info {
  grid-area: live-info;
}

.chat-messages-container {
  grid-area: chat-messages-container;
  overflow-y: scroll;
}

.chat-input {
  grid-area: chat-input;
}
</style>
