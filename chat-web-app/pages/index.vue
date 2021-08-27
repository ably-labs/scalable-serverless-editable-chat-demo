<template>
  <div class="min-h-screen max-h-screen background">
    <AppContainer />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["instantiateAbly"])
  },
  mounted() {
    this.instantiateAbly();
  }
};
</script>

<style>
.background {
  background: linear-gradient(120deg, #040f18, #111e36);
  @apply text-white;
}

@screen lg {
  .background {
    background: linear-gradient(120deg, #040f18, #111e36);
  }
}
</style>
