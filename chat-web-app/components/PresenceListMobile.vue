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
@media (max-width: 1009px) {
  .presence-list-section-container {
    @apply p-5 text-base border-l-0 border border-white flex flex-col w-60 bg-gray-900 rounded-tr-xl rounded-br-xl text-justify;
    height: 75vh;
  }

  .online-green-icon {
    @apply mr-2 text-sm text-center my-0.5 text-green-600;
  }
}
</style>
