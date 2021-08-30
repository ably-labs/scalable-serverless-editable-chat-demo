<template>
  <div class="chat-msgs-container" ref="chatMessagesContainer">
    <div class="overflow-y-scroll" id="container" ref="messagesArr">
      <SingleChatMsgCard
        v-for="msg in getChatMessagesArray"
        :key="msg.msg_id"
        :msgPayload="msg"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getChatMessagesArray", "getChatMessagesArrayUpdateType"])
  },
  watch: {
    getChatMessagesArray() {
      if (this.getChatMessagesArrayUpdateType != "edit") {
        this.$nextTick(() => {
          this.$refs.messagesArr.scrollTop = this.$refs.messagesArr.scrollHeight;
        });
      }
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
