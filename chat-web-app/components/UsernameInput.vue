<template>
  <div class="flex justify-center items-center align-middle w-full">
    <input
      type="text"
      class="border border-gray-600 rounded-xl bg-transparent pl-8 p-2 m-3 w-5/6 text-white"
      placeholder="Enter a nickname to start chatting..."
      v-model="username"
      @keyup.enter="setUsernameAndEnterChat(username)"
    />
    <button
      class="rounded-xl bg-purple-500 p-2 m-3 w-1/6 border border-purple-500"
      @click="setUsernameAndEnterChat(username)"
    >
      Enter chat
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    ...mapMutations(["setUsername"]),
    setUsernameAndEnterChat() {
      this.setUsername(this.username);
    }
  }
};
</script>
