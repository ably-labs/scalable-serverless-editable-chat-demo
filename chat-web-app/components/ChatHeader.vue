<template>
  <div class="p-5 text-xl">Group chat</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getIsUsernameEntered"])
  },
};