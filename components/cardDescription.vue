<template>
	<div class="flex flex-col bg-blue-500 w-[380px] h-[450px] p-5 justify-center rounded-[30px]">
    <div class="flex flex-col relative">
      <div class="flex flex-col pt-3 bg-red-400">
        <p class="mb-3 bg-green">{{ title }}</p>
        <p class="mb-3">DESCRIPTION</p>
      </div>
      <div class="flex items-center bg-red-200 h-[200px] justify-center overflow-auto">
        <p class="p-2">{{ content }}</p>
      </div>
      <div class="mt-3">
        <p class="pb-2">{{ where }}</p>
        <p>{{ when }}</p>
      </div>
      <div class="flex flex-row justify-center items-center mt-4 relative">
        <VButton :is-rounded="true">
          JOIN ACTIVITY
        </VButton>
         <VIcon
            :alt="'ces-eye'"
            :icon="'ces-eye'"
            size="large"
            class="absolute right-8"
          />

      </div>
    </div>
	</div>
</template>


<script setup lang="ts">
  interface Prop {
    title?: string
    content?: string
    where?: string
    when?: string
  }

  const props = withDefaults(defineProps<Prop>(), {
    title: '',
    content: '',
    where: '',
    when: ''
  })
</script>