<template>
  <h2 class="chat-header">Group chat</h2>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getIsUsernameEntered"])
  }
};
</script>

<style scoped>
.chat-header {
  @apply p-5 text-xl;
}
</style>
