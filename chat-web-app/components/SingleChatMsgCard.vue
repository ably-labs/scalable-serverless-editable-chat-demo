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
        {{ msgPayload.msg_data }}
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
    this.isMsgMine = this.msgPayload.client_id === this.getMyClientId;
    console.log(this.msgPayload.client_id, this.getMyClientId, this.isMsgMine);
  }
};
</script>
