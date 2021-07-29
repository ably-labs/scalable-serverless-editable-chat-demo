<template>
  <div class="p-5 text-xl border-l-2 border-r-2 border-gray-800  flex flex-col">
    <div class="">
      <font-awesome-icon
        class="mr-2 text-sm text-center my-0.5 text-green-600"
        :icon="['fas', 'circle']"
      />
      Online now ({{ getPresenceCount }})
    </div>
    <div class="overflow-y-scroll">
      <SingleOnlineMember
        v-for="member in getOnlineMembersArr"
        :key="member.id"
        :memberData="member"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getOnlineMembersArr", "getPresenceCount"])
  }
};
</script>
