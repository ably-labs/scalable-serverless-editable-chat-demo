<template>
  <div class="min-h-screen max-h-screen background">
    <AppContainer />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

// Perhaps explain what vuex does here, because this looks like magic if you've never seen it!

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

/* can we remove the below ? */

/* 
@screen sm {
  .background {
    background-color: red;
  }
}

@screen md {
  .background {
    background-color: yellow;
  }
}

@screen xl {
  .background {
    background-color: plum;
  }
} */

@screen lg {
  .background {
    background: linear-gradient(120deg, #040f18, #111e36);
  }
}
</style>
