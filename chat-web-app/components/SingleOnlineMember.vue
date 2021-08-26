<template>
  <div class="online-user-li">
    <font-awesome-icon class="mr-2" :icon="['fas', 'user']" />{{
      memberData.username
    }}
  </div>
</template>

<script>
export default {
  props: ["memberData"],
  data() {
    return {};
  }
};
</script>
<style scoped>
.online-user-li {
  @apply text-2xl my-4;
}

@media (max-width: 1009px) {
  .online-user-li {
    @apply text-base my-2;
  }
}
</style>
