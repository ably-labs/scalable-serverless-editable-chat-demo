<template>
  <div
    class="p-5 text-xl border-l-2 border-r-2 border-gray-800  flex flex-col max-w-full"
  >
    <div class="">
      Live commentary
    </div>
    <div class="overflow-y-scroll">
      <div class="bg-gray-800 my-4 p-4 text-base">
        <font-awesome-icon
          class="mr-2 text-base text-centertext-white"
          :icon="['fas', 'info-circle']"
        />
        A play-by-play of whatever happens behind the scenes will appear in this
        section so you can follow along.
        <br />
        <br />
        Start by entering the chat.
      </div>
      <div v-highlight class="text-xs">
        <VueCodeHighlight language="javascript">
          <pre>

    ablyRealtimeInstance = new Ably.Realtime({
      key: 'ablyAPIKey',
      clientId: 'uniqueId',
    });
    ablyRealtimeInstance.connection.on("connected", () => {
      chatChannelInstance = ablyRealtimeInstance.channels.get(
        '[?rewind=2m]chat-airtable'
      );
    });

 </pre
          >
        </VueCodeHighlight>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { component as VueCodeHighlight } from "vue-code-highlight";
import "vue-code-highlight/themes/prism.css";

export default {
  data() {
    return {
      textSnippets: {},
      code: "npm install vue-prismjs --save"
    };
  },
  components: {
    VueCodeHighlight
  },
  computed: {
    ...mapGetters([, "getPresenceCount"])
  },
  created() {
    this.textSnippets = {
      beforeUserEnteredPresence: "Start by entering the chat",
      presenceCountZeroBeforeEnter:
        "There is no one using this chat app except you currently.",
      presenceCountNotZeroBeforeEnter:
        "There are people already using this chat app."
    };
  }
};
</script>
