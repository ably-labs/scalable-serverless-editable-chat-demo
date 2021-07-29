<template>
  <div class="flex">
    <input
      type="text"
      class="border border-gray-600 rounded-xl bg-transparent pl-8 p-2 m-3 w-11/12 text-white"
      placeholder="Write a message..."
      v-model="chatMsg"
      @keyup.enter="publishMyMsg(chatMsg)"
    />
    <button class="my-2 rounded" @click="publishMyMsg(chatMsg)">
      <font-awesome-icon
        class="text-purple-500"
        :icon="['fas', 'paper-plane']"
      />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      chatMsg: ""
    };
  },
  methods: {
    ...mapActions(["publishMyChatMsgToAbly"]),
    publishMyMsg(msg) {
      this.publishMyChatMsgToAbly(msg);
      this.chatMsg = "";
    }
  }
};
</script>
