<template>
  <div class="grid text-gray-200 font-sans max-h-screen">
    <LeftNavBar class="left-navbar" />
    <TopBar class="topbar" />
    <ChatDetails class="chat-details" />
    <ChatHeader class="chat-header " />
    <ChatMessagesContainer
      class="chat-messages-container"
      v-if="getIsUsernameEntered"
    />
    <UsernameInput v-if="!getIsUsernameEntered" />
    <ChatInput class="chat-input" />
    <LiveInfo class="live-info" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  methods: {
    ...mapActions(["instantiateAbly", "enterClientInAblyPresenceSet"])
  },
  computed: {
    ...mapGetters([
      "getIsUsernameEntered",
      "getUsername",
      "getIsAblyConnectedStatus"
    ])
  },
  watch: {
    getIsUsernameEntered(newStatus, oldStatus) {
      if (newStatus && this.getIsAblyConnectedStatus) {
        this.enterClientInAblyPresenceSet();
      }
    }
  },
  created() {
    console.log(this.getIsUsernameEntered, this.getUsername);
  }
};
</script>

<style>
@media (max-width: 1009px) {
  .left-navbar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 5rem;
  }

  .live-info {
    display: none;
  }
}

@media (min-width: 1110px) {
  .grid {
    display: grid;
    grid-template-rows: 100px 1fr 10fr 1fr;
    grid-template-columns: 100px 1fr 2.75fr 2.25fr;
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
}
</style>
