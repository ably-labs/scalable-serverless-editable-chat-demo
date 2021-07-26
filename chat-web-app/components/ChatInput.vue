<template>
  <div class="flex">
    <input
      type="text"
      class="border border-gray-600 rounded-xl bg-transparent pl-8 p-2 m-3 w-11/12 text-white"
      placeholder="Write a message..."
    />
    <button class="my-2 rounded" @click="publishMessage()">
      <font-awesome-icon
        class="text-purple-500"
        :icon="['fas', 'paper-plane']"
      />
    </button>
  </div>
</template>
