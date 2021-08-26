<template>
  <div class="flex" v-if="getIsUsernameEntered">
    <input
      type="text"
      class="chat-input-box"
      placeholder="Write a message..."
      v-model="chatMsg"
      @keyup.enter="publishMyMsg(chatMsg)"
    />
    <button class="chat-send-btn" @click="publishMyMsg(chatMsg)">
      <font-awesome-icon
        class="text-purple-500"
        :icon="['fas', 'paper-plane']"
      />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      chatMsg: ""
    };
  },
  computed: {
    ...mapGetters(["getIsUsernameEntered"])
  },
  methods: {
    ...mapActions(["publishMyChatMsgToAbly"]),
    publishMyMsg(msg) {
      if (this.chatMsg) {
        this.publishMyChatMsgToAbly(msg);
        this.chatMsg = "";
      }
    }
  }
};
</script>
<style scoped>
.chat-input-box {
  @apply border border-gray-600 rounded-xl bg-transparent pl-8 p-2 m-3 w-11/12 text-white text-base;
}

.chat-send-btn {
  @apply my-2 rounded;
}

@media (max-width: 1009px) {
  .chat-input-box {
    @apply border border-gray-600 rounded-xl bg-transparent pl-4 p-2 mx-2 my-3 w-11/12 text-white text-sm;
  }

  .chat-send-btn {
    @apply m-3;
  }
}
</style>
