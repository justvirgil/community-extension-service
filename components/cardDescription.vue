<template>
  <div class="flex items-center justify-center">
    <div
      class="flex flex-col bg-dark-blue w-[380px] h-[450px] p-5 justify-center rounded-[30px] z-50"
    >
      <div class="flex flex-col relative">
        <button class="absolute right-3" @click="emit('click')">
          <VIcon
            :alt="'ces-cross'"
            :icon="'ces-cross'"
            class="text-sm text-red-600"
          />
        </button>
        <div class="flex flex-col pt-3">
          <p class="mb-3 w-full h-6 text-cream">Title: {{ cardData.name }}</p>
          <p class="mb-3 w-full h-6 text-cream">DESCRIPTION</p>
        </div>
        <div class="flex items-center h-[150px] justify-center overflow-auto">
          <p class="p-2 text-cream">{{ cardData.description }}</p>
        </div>
        <div class="w-full">
          <p class="mb-2 w-full h-6 text-cream">Where: {{ cardData.where }}</p>
          <p class="mb-2 w-full h-6 text-cream">
            When: {{ timeConverter(cardData.when) }}
          </p>
        </div>
        <div class="flex flex-row justify-center items-center mt-4 relative">
          <div>
            <button
              class="rounded-full bg-light-green text-cream w-fit px-5"
              @click="emit('join')"
            >
              {{ buttonName }}
            </button>
          </div>
          <div>
            <button
              @click="emit('fullPage')"
              class="rounded-full ml-12 flex justify-center items-center"
            >
              <VIcon
                :alt="'ces-eye'"
                :icon="'ces-eye'"
                size="large"
                class="text-cream"
              />
            </button>
          </div>
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

  withDefaults(defineProps<card & { buttonName?: string }>(), () => ({
    cardData: {
      name: '',
      description: '',
      where: '',
      when: ''
    },
    buttonName: 'JOIN ACTIVITY'
  }))
</script>
