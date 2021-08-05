<template>
  <div class="app-container">
    <LeftNavBar class="left-navbar" v-if="!isPresenceListMobileOpen" />
    <TopBar class="topbar" />
    <div class="presence-list-container">
      <button
        class="show-presence-list-btn"
        @click="showPresenceListOnMobile()"
      >
        <font-awesome-icon :icon="['fas', 'user']" />
        <p>2</p>
        <transition name="slide-in-out">
          <div v-if="isPresenceListMobileOpen">
            <ChatDetails class="" />
          </div>
        </transition>
      </button>
    </div>
    <ChatDetails class="chat-details" />
    <ChatHeader class="chat-header" />
    <ChatMessagesContainer
      class="chat-messages-container"
      v-if="getIsUsernameEntered"
    />
    <UsernameInput class="username-input" v-if="!getIsUsernameEntered" />
    <ChatInput class="chat-input" />
    <LiveInfo class="live-info" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      isPresenceListMobileOpen: false
    };
  },
  methods: {
    ...mapActions(["instantiateAbly", "enterClientInAblyPresenceSet"]),
    showPresenceListOnMobile() {
      this.isPresenceListMobileOpen = !this.isPresenceListMobileOpen;
    }
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
  .presence-list-container {
    position: absolute;
    left: 0;
    top: 15vh;
    width: 15vw;
    height: 20vh;
    @apply m-2 border-r border-gray-800 text-center;
  }

  .show-presence-list-btn {
    @apply m-1;
  }
  .left-navbar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 15vw;
    height: 65vh;
  }
  .live-info {
    display: none;
  }
  .chat-header {
    display: none;
  }
  .chat-details {
    display: none;
  }
  .chat-messages-container {
    width: 100vw;
    padding-left: 20vw;
    height: 75vh;
  }
  .username-input {
    width: 85vw;
    padding-left: 20vw;
    height: 85vh;
  }

  .chat-input {
    width: 100vw;
    padding-left: 20vw;
  }

  .slide-in-out-enter-active {
    animation: slide-in-out 0.5s reverse;
  }

  .slide-in-out-leave-active {
    animation: slide-in-out 0.5s;
  }
  @keyframes slide-in-out {
    0% {
      margin-left: 0%;
    }
    100% {
      margin-left: -100%;
    }
  }
}

@screen md {
  .presence-list-container {
    display: none;
  }
  .app-container {
    @apply grid text-gray-200 font-sans max-h-screen;
  }
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
