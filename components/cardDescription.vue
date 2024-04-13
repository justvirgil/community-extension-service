<template>
  <div class="flex items-center justify-center">
    <div
      class="flex flex-col bg-blue-500 w-[380px] h-[450px] p-5 justify-center rounded-[30px] z-50"
    >
      <div class="flex flex-col relative">
        <button class="absolute right-3" @click="emit('click')">
          <VIcon :alt="'ces-exit'" :icon="'ces-exit'" class="text-sm" />
        </button>
        <div class="flex flex-col pt-3 bg-red-400">
          <p class="mb-3 w-full h-6 bg-green">{{ cardData.name }}</p>
          <p class="mb-3 w-full h-6 bg-blue-200">DESCRIPTION</p>
        </div>
        <div
          class="flex items-center bg-red-200 h-[200px] justify-center overflow-auto"
        >
          <p class="p-2">{{ cardData.description }}</p>
        </div>
        <div class="w-full bg-red-400">
          <p class="mb-2 w-full h-6 bg-green">{{ cardData.where }}</p>
          <p class="mb-2 w-full h-6">{{ timeConverter(cardData.when) }}</p>
        </div>
        <div class="flex flex-row justify-center items-center mt-4 relative">
          <button
            class="rounded-full bg-green w-fit px-5"
            @click="emit('join')"
          >
            JOIN ACTIVITY
          </button>
          <button
            @click="emit('fullPage')"
            class="rounded-full bg-green w-fit px-5"
          >
            <VIcon
              :alt="'ces-eye'"
              :icon="'ces-eye'"
              size="large"
              class="absolute right-8"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { timeConverter } = useTools()

  interface card {
    cardData: {
      name?: string
      description?: string
      where?: string
      when?: string
    }
  }

  interface Emit {
    (e: 'click' | 'join' | 'fullPage'): void
  }

  const emit = defineEmits<Emit>()

  withDefaults(defineProps<card>(), () => ({
    cardData: {
      name: '',
      description: '',
      where: '',
      when: ''
    }
  }))
</script>
