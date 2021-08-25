<template>
  <div class="app-container">
    <TechStackSection class="tech-stack-section" />
    <Header class="header" />
    <div class="presence-list-container">
      <button
        class="show-presence-list-btn "
        @click="showPresenceListOnMobile()"
      >
        <font-awesome-icon :icon="['fas', 'user']" />
        <p>{{ this.getPresenceCount }}</p>
      </button>
      <transition name="slide-in-out">
        <div v-if="isPresenceListMobileOpen">
          <PresenceListMobile />
        </div>
      </transition>
    </div>
    <PresenceListSection class="presence-list-section" />
    <ChatHeader class="chat-header" />
    <ChatMessagesContainer
      class="chat-messages-container"
      v-if="getIsUsernameEntered"
    />
    <UsernameInput class="username-input" v-if="!getIsUsernameEntered" />
    <ChatInput class="chat-input" />
    <InfoSection class="info-section" />
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
      "getIsAblyConnectedStatus",
      "getPresenceCount"
    ])
  },
  watch: {
    getIsUsernameEntered(newStatus, oldStatus) {
      if (newStatus && this.getIsAblyConnectedStatus) {
        this.enterClientInAblyPresenceSet();
      }
    }
  },
  created() {}
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
    @apply m-2  text-center border-r border-gray-800;
  }

  .show-presence-list-btn {
    @apply m-1;
  }
  .tech-stack-section {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 15vw;
    height: 65vh;
  }
  .info-section {
    display: none;
  }
  .chat-header {
    display: none;
  }
  .presence-list-section {
    display: none;
  }
  .chat-messages-container {
    width: 100vw;
    padding-left: 20vw;
    height: 75vh;  /* ordering of css properties, width, height, padding*/
  }
  .username-input {
    width: 85vw;
    padding-left: 20vw;
    height: 85vh; /* ordering of css properties, width, height, padding*/
  }

  .chat-input {
    width: 100vw;
    padding-left: 20vw;
  }

  .slide-in-out-enter-active {
    animation: slide-in-out 0.8s reverse;
  }

  .slide-in-out-leave-active {
    animation: slide-in-out 0.8s;
  }
  @keyframes slide-in-out {
    0% {
      margin-left: 0%;
    }
    100% {
      margin-left: -500%; /* where possible, animate on transform: translateX rather than on margin, it makes for smoother, more performant animation */
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
    grid-template-columns: 100px 1fr 2.75fr minmax(auto, 40%);
    grid-template-areas:
      "tech-stack-section header header header"
      "tech-stack-section presence-list-section chat-header info-section"
      "tech-stack-section presence-list-section chat-messages-container info-section"
      "tech-stack-section presence-list-section chat-input info-section";
    height: 100vh;
  }
  .tech-stack-section {
    grid-area: tech-stack-section;
  }

  .header {
    grid-area: header;
  }
  .chat-header {
    grid-area: chat-header;
  }
  .presence-list-section {
    grid-area: presence-list-section;
  }
  .info-section {
    grid-area: info-section;
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
