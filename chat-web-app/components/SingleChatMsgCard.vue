<template>
  <div class="">
    <div
      class="flex items-baseline"
      :class="{
        'flex-row-reverse': isMsgMine
      }"
    >
      <div v-if="isMsgMine && !didClickEdit">
        <button @click="editMyMsg(msgPayload.msg_id)">
          <font-awesome-icon class="update-btn" :icon="['fas', 'pencil-alt']" />
        </button>
      </div>
      <div v-if="isMsgMine && didClickEdit" class="flex flex-col">
        <button @click="saveEditedMsg()">
          <font-awesome-icon class="update-btn" :icon="['fas', 'check']" />
        </button>
        <button @click="cancelEditMsg(msgPayload.msg_id)">
          <font-awesome-icon class="update-btn" :icon="['fas', 'times']" />
        </button>
      </div>
      <div class="message-card">
        <div
          class="message-box"
          :class="{
            'bg-gray-800': !isMsgMine,
            'bg-purple-500': isMsgMine
          }"
        >
          <div
            :contenteditable="didClickEdit"
            ref="editMsgPara"
            @keydown.enter="saveEditedMsg()"
          >
            {{ messageContents }}
          </div>
        </div>
        <div
          class="message-metadata"
          :class="{
            'flex-row-reverse': isMsgMine
          }"
        >
          by {{ msgPayload.username }}
          <template v-if="!isMsgFromToday">
            on {{ date }}/{{ month }}
          </template>
          <!-- <template v-if="isMsgFromToday">
            today
          </template> -->
          at {{ readableTimestamp }}
          <template v-if="isMsgEdited">&bull; edited &bull;</template>
        </div>
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
      msgBeforeEdit: null,
      editedChatMsg: null,
      didClickEdit: false,
      isMsgFromToday: null,
      date: null,
      month: null,
      year: null
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
    },
    readableTimestamp() {
      const messageTime24HrFormat = new Date(
        this.msgPayload.created_at_timestamp
      );
      if (!(this.isMsgFromToday = this.isToday(messageTime24HrFormat))) {
        this.date = messageTime24HrFormat.getDate();
        this.month = messageTime24HrFormat.getMonth() + 1;
        this.year = messageTime24HrFormat.getFullYear();
      }
      let hours = messageTime24HrFormat.getHours();
      let minutes = messageTime24HrFormat.getMinutes();
      return this.convertTo12HrFormat(hours, minutes);
    },
    isMsgEdited() {
      return this.msgPayload.is_edited;
    }
  },
  methods: {
    ...mapActions(["publishMyEditedMsgToAbly"]),
    editMyMsg(msgId) {
      this.didClickEdit = true;
      this.$nextTick(() => {
        this.msgBeforeEdit = this.$refs.editMsgPara.innerText;
        this.$refs.editMsgPara.focus();
      });
    },
    cancelEditMsg() {
      this.didClickEdit = false;
    },
    saveEditedMsg() {
      this.editedChatMsg = this.$refs.editMsgPara.innerText;
      if (this.msgBeforeEdit != this.editedChatMsg) {
        //this.isMsgEdited = true;
        this.publishMyEditedMsg();
      }
      this.didClickEdit = false;
    },
    isToday(msgDate) {
      const today = new Date();
      if (
        today.getDate() == msgDate.getDate() &&
        today.getMonth() == msgDate.getMonth() &&
        today.getFullYear() == msgDate.getFullYear()
      ) {
        return true;
      } else {
        return false;
      }
    },
    convertTo12HrFormat(hours, minutes) {
      minutes = (minutes < 10 ? "0" : "") + minutes;
      let ampm = hours < 12 ? "am" : "pm";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm} `;
    },
    publishMyEditedMsg() {

      // Why don't we just inject the correct ably channel and publish to it rather than callback into a function exported from the state dictionary?

      this.publishMyEditedMsgToAbly({ editedMsg: this.editedChatMsg, msgIdToEdit: this.msgPayload.msg_id });
      this.editedChatMsg = null;
    }
  },
  created() {
    this.isMsgMine = this.msgPayload.client_id === this.getMyClientId;
  }
};
</script>

<style scoped>
.message-box {
  @apply rounded-xl p-3 text-base;
}

.message-metadata {
  @apply text-xs px-3 py-1 flex items-center text-gray-500;
}

.message-card {
  @apply w-8/12 m-4;
}

.update-btn {
  @apply mr-2 text-sm text-center text-white;
}

@media (max-width: 1009px) {
  .message-box {
    @apply rounded-lg px-3 py-2 mt-1 text-sm;
  }
  .message-metadata {
    font-size: 0.6rem;
    @apply px-3 py-1 flex items-center;
  }
  .message-card {
    @apply w-8/12 m-1;
  }
  .update-btn {
    @apply mx-1;
  }
}
</style>
