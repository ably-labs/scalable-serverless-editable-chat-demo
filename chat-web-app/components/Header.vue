<template>
  <header class="top-bar-container">
    <h1 class="app-title">
      Scalable serverless realtime messaging demo
    </h1>
    <div class="github-buttons">
      <gh-btns-star
        slug="ably-labs/scalable-serverless-chat-demo"
        show-count
        class="gh-btn"
      ></gh-btns-star>
      <gh-btns-fork
        slug="ably-labs/scalable-serverless-chat-demo"
        show-count
        class="gh-btn"
      ></gh-btns-fork>
    </div>
  </header>
</template>
<style scoped>
@media (max-width: 1009px) {
  .app-title {
    @apply font-bold text-xl;
  }
  .top-bar-container {
    @apply px-5 py-1 text-center border-b-2 border-gray-800;
    height: 15vh;
  }

  .github-buttons {
    @apply mt-2 flex justify-center;
  }
}

@screen md {
  .top-bar-container {
    @apply p-5 flex justify-between items-center border-2 border-t-0 border-gray-800;
  }
  .app-title {
    @apply text-4xl;
  }
}
</style>
