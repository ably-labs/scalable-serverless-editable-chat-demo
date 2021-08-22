<template>
  <div class="chat-msgs-container" ref="chatMessagesContainer">
    <div class="overflow-y-scroll" id="container" ref="messagesArr">
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
    ...mapGetters(["getChatMessagesArr", "getChatMessagesArrUpdateType"])
  },
  watch: {
    getChatMessagesArr() {
      if (this.getChatMessagesArrUpdateType != "edit") {
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
