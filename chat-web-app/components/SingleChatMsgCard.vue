<template>
  <div class="">
    <div
      class="flex"
      :class="{
        'flex-row-reverse': isMsgMine
      }"
    >
      <div
        class="rounded-xl w-8/12  m-4 p-3"
        :class="{
          'bg-gray-800': !isMsgMine,
          'bg-purple-500': isMsgMine
        }"
      >
        {{ msgPayload.timestamp }}
        {{ msgPayload.data.content }}
        {{ msgPayload.id }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: ["msgPayload"],
  data() {
    return {
      isMsgMine: ""
    };
  },
  computed: {
    ...mapGetters(["getMyClientId"])
  },
  created() {
    this.isMsgMine = this.msgPayload.clientId === this.getMyClientId;
    console.log(this.msgPayload.clientId, this.getMyClientId, this.isMsgMine);
  }
};
</script>
