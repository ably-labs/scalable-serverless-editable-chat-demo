<template>
  <div class="presence-list-section-container">
    <div class="">
      <font-awesome-icon class="online-green-icon" :icon="['fas', 'circle']" />
      Online now ({{ getPresenceCount }})
    </div>
    <div class="overflow-y-scroll">
      <SingleOnlineMember
        v-for="member in getOnlineMembersArray"
        :key="member.id"
        :memberData="member"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getOnlineMembersArray", "getPresenceCount"])
  }
};
</script>

<style scoped>
@screen md {
  .presence-list-section-container {
    @apply p-5 text-xl border-l-2 border-r-2 border-gray-800 flex flex-col;
  }

  .online-green-icon {
    @apply mr-2 text-sm text-center my-0.5 text-green-600;
  }
}
</style>
