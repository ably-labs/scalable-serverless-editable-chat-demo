<template>
  <div class="" ref="chatMessagesContainer">
    <SingleChatMsgCard
      v-for="msg in getChatMessagesArr"
      :key="msg.msg_id"
      :msgPayload="msg"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getChatMessagesArr"])
  },
  watch: {
    getChatMessagesArr() {}
  },
  mounted() {}
};
</script>

<style scoped></style>
