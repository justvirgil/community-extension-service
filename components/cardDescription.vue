<template>
	<div class="flex flex-col bg-blue-500 w-[380px] h-[450px] p-5 justify-center rounded-[30px]">
    <div class="flex flex-col relative">
      <div class="flex flex-col pt-3 bg-red-400">
        <p class="mb-3 bg-green">{{ cardData.name }}</p>
        <p class="mb-3">DESCRIPTION</p>
      </div>
      <div class="flex items-center bg-red-200 h-[200px] justify-center overflow-auto">
        <p class="p-2">{{ cardData.description }}</p>
      </div>
      <div class="mt-3">
        <p class="pb-2">{{ cardData.where }}</p>
        <p>{{ cardData.when }}</p>
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
  interface cardData {
    cardData: {
      name?: string
      description?: string
      where?: string
      when?: string
    }
  }

  withDefaults(defineProps<cardData>(), {
    cardData: {
      name: '',
      description: '',
      where: '',
      when: ''
    }
  })
</script>