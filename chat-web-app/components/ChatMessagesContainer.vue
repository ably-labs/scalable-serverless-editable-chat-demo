<template>
  <div class="chat-msgs-container" ref="chatMessagesContainer">
    <div class="overflow-y-scroll" id="container">
      <SingleChatMsgCard
        v-for="msg in getChatMessagesArr"
        :key="msg.msg_id"
        :msgPayload="msg"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getChatMessagesArr"])
  },
  watch: {
    getChatMessagesArr() {
      const container = this.$el.querySelector("#container");
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.chat-msgs-container {
  @apply flex flex-col;
}
</style>
