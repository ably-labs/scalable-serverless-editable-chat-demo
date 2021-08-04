<template>
  <header class="top-bar-container py-5">
    <h1 class="font-bold text-4xl">
      Scalable serverless realtime messaging demo
    </h1>
    <div class="github-buttons">
      <gh-btns-star
        slug="ably-labs/jamstack-sync-stream-video"
        show-count
        class="gh-btn"
      ></gh-btns-star>
      <gh-btns-fork
        slug="ably-labs/jamstack-sync-stream-video"
        show-count
        class="gh-btn"
      ></gh-btns-fork>
    </div>
  </header>
</template>
<style scoped>
@media (max-width: 1009px) {
  h1 {
    margin-bottom: 1rem;
    font-size: 5vw;
    line-height: 1.2em;
    text-align: center;
  }
  .github-buttons {
    margin: 5px;
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 1110px) {
  .top-bar-container {
    @apply p-5 flex justify-between border-2 border-gray-800 items-center;
  }
}
</style>
