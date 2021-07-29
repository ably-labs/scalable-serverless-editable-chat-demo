<template>
  <div class="text-2xl my-4">
    <font-awesome-icon class="mr-2" :icon="['fas', 'user']" />{{
      memberData.username
    }}
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: ["memberData"],
  data() {
    return {
      tri: "user-ninja"
    };
  }
};
</script>
