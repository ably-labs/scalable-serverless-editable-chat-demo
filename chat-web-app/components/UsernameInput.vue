<template>
  <div class="username-container">
    <input
      type="text"
      class="username-input-box"
      placeholder="Add a nickname"
      v-model="username"
      @keyup.enter="setUsernameAndEnterChat(username)"
    />
    <button
      class="username-input-btn"
      @click="setUsernameAndEnterChat(username)"
    >
      Enter
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

<style scoped>
@media (max-width: 1009px) {
  .username-container {
    @apply flex flex-col w-full text-center justify-center items-center text-sm;
  }

  .username-input-box {
    @apply border border-gray-600 rounded-xl bg-transparent p-2 w-5/6 text-white text-center;
  }

  .username-input-btn {
    @apply rounded-xl bg-purple-500 p-2 m-1 w-5/6 border border-purple-500;
  }
}

@screen md {
  .username-container {
    @apply flex justify-center items-center align-middle w-full;
  }

  .username-input-box {
    @apply border border-gray-600 rounded-xl bg-transparent pl-8 p-2 m-3 w-5/6 text-white;
  }

  .username-input-btn {
    @apply rounded-xl bg-purple-500 p-2 m-3 w-1/6 border border-purple-500;
  }
}
</style>
