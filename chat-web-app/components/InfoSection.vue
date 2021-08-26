<template>
  <div
    class="p-5 text-xl border-l-2 border-r-2 border-gray-800  flex flex-col max-w-full"
  >
    <div class="">
      Description and details
    </div>
    <div class="overflow-y-scroll">
      <p class="bg-gray-800 my-4 p-4 text-base">
        <font-awesome-icon
          class="mr-2 text-base text-centertext-white"
          :icon="['fas', 'info-circle']"
        />
        This demo shows a fully serverless chat application that can easily
        scale up due to the SaaS components used in the architecture.
        <br />
        <br />
        At its core, is the
        <a
          class="text-blue-300 hover:text-blue-400"
          href="https://ably.com/pub-sub-messaging"
          target="_blank"
          >Pub/Sub messaging architecture</a
        >, powered by Ably.
      </p>
      <div>
        <label for="toggle" class="text-xs text-white"
          >Show architecture diagram
        </label>
        <div
          class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <input
            @click="toggleView()"
            type="checkbox"
            name="toggle"
            id="toggle"
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            for="toggle"
            class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>
      <div class="text-xs my-2" v-if="isCurrentViewCodeSnippet">
        <VueCodeHighlight language="javascript">
          <pre>
    ablyRealtimeInstance = new Ably.Realtime({ 
      authUrl: 'your-auth-endpoint',
    }); 

    chatChannelInstance = ablyRealtimeInstance.channels.get(
      '[?rewind=2m]chat' 
    ); 

    chatChannelInstance.subscribe(msg)=> {
      handleNewMsg(msg) 
    }); 

    chatChannelInstance.publish('chat-msg', {
      chatData 
    });
          </pre>
        </VueCodeHighlight>
      </div>
      <div class="text-xs my-2" v-if="!isCurrentViewCodeSnippet">
        <img
          src="../assets/architecture.jpeg"
          alt="Serverless chat app architecture"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { component as VueCodeHighlight } from "vue-code-highlight";
import "vue-code-highlight/themes/prism.css";

export default {
  data() {
    return {
      isCurrentViewCodeSnippet: true
    };
  },
  components: {
    VueCodeHighlight
  },
  computed: {
    ...mapGetters(["getPresenceCount"])
  },
  methods: {
    toggleView() {
      this.isCurrentViewCodeSnippet = !this.isCurrentViewCodeSnippet;
    }
  }
};
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68d391;
}
</style>
