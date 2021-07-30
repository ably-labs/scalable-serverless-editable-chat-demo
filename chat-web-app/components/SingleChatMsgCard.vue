<template>
  <div class="">
    <div
      class="flex items-center"
      :class="{
        'flex-row-reverse': isMsgMine
      }"
    >
      <button
        @click="editMyMsg(msgPayload.msg_id)"
        v-if="isMsgMine && !didClickEdit"
      >
        <font-awesome-icon
          class="mr-2 text-sm text-center text-white"
          :icon="['fas', 'pencil-alt']"
        />
      </button>
      <div v-if="isMsgMine && didClickEdit" class="flex flex-col">
        <button @click="saveEditedMsg()">
          <font-awesome-icon
            class="mr-2 text-sm text-center text-white"
            :icon="['fas', 'check']"
          />
        </button>
        <button @click="cancelEditMsg(msgPayload.msg_id)">
          <font-awesome-icon
            class="mr-2 text-sm text-center text-white"
            :icon="['fas', 'times']"
          />
        </button>
      </div>
      <div
        class="rounded-xl w-8/12 m-4 p-3"
        :class="{
          'bg-gray-800': !isMsgMine,
          'bg-purple-500': isMsgMine
        }"
      >
        <p :contenteditable="didClickEdit" ref="editMsgPara">
          {{ messageContents }}
        </p>
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
      isMsgMine: "",
      editedChatMsg: null,
      didClickEdit: false
    };
  },
  computed: {
    ...mapGetters(["getMyClientId"]),
    messageContents() {
      let originalMessage = this.msgPayload.msg_data;
      if (this.editedChatMsg) {
        return this.editedChatMsg;
      } else {
        return originalMessage;
      }
    }
  },
  methods: {
    editMyMsg(msgId) {
      this.didClickEdit = true;
      this.$nextTick(() => {
        this.$refs.editMsgPara.focus();
      });
    },
    cancelEditMsg() {
      this.didClickEdit = false;
    },
    saveEditedMsg() {
      this.editedChatMsg = this.$refs.editMsgPara.textContent;
      this.didClickEdit = false;
    }
  },
  created() {
    this.isMsgMine = this.msgPayload.client_id === this.getMyClientId;
    console.log(this.msgPayload.client_id, this.getMyClientId, this.isMsgMine);
  }
};
</script>
