<template>
  <div class="">
    <SingleChatMsgCard
      v-for="msg in getChatMessagesArr"
      :key="msg.id"
      :msgPayload="msg"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getChatMessagesArr"])
  }
};
</script>
