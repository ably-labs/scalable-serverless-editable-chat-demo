<template>
  <div class="chat-details-container">
    <div class="">
      <font-awesome-icon class="online-green-icon" :icon="['fas', 'circle']" />
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

<style scoped>
/* @media (max-width: 1009px) {
  .chat-details-container {
    position: absolute;
    left: 0;
    top: 10vh;
    height: 90vh;
    width: 5rem;
    background-color: yellow;
    transition: width 1s ease-in-out;
  }

  .chat-details-container:after {
    content: "";
    display: block;
    width: 5rem;
    height: 5rem;
    background: url(../assets/user.png) no-repeat center 5rem #ff0000;
  }
} */

@screen md {
  .chat-details-container {
    @apply p-5 text-xl border-l-2 border-r-2 border-gray-800 flex flex-col;
  }

  .online-green-icon {
    @apply mr-2 text-sm text-center my-0.5 text-green-600;
  }
}
</style>
