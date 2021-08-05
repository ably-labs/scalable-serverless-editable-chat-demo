<template>
  <div class="tech-stack-container">
    <p class="tech-stack-title">
      Tech stack
    </p>
    <a href="https://nuxtjs.org/" target="_blank">
      <img src="../assets/NuxtLogo.png" alt="Nuxt logo" class="tech-stack-logo"
    /></a>
    <a href="https://ably.com/" target="_blank">
      <img src="../assets/AblyLogo.png" alt="Ably logo" class="tech-stack-logo"
    /></a>
    <a href="https://aws.amazon.com/lambda/" target="_blank">
      <img
        src="../assets/LambdaLogo.png"
        alt="Lambda logo"
        class="tech-stack-logo"
    /></a>
    <a href="https://aws.amazon.com/rds/" target="_blank">
      <img src="../assets/RDSLogo.png" alt="RDS logo" class="tech-stack-logo"
    /></a>
    <a href="https://www.postgresql.org/" target="_blank">
      <img
        src="../assets/PostgresLogo.png"
        alt="Postgres logo"
        class="tech-stack-logo"
    /></a>
  </div>
</template>
<style scoped>
.tech-stack-container {
  @apply p-3 m-2 flex flex-col justify-center max-h-screen;
}

.tech-stack-title {
  @apply text-xs font-medium my-8 text-center;
}

.tech-stack-logo {
  @apply p-2 bg-gray-100 border border-gray-800 rounded-lg my-4;
}

@media (max-width: 1009px) {
  .tech-stack-container {
    @apply border-r border-gray-800;
  }
}

@screen md {
  .tech-stack-title {
    @apply p-2 text-base font-medium rounded-lg my-8 text-center;
  }
}
</style>
