<template>
  <div class="flex items-center justify-center">
    <div
      class="flex flex-col bg-dark-blue w-[380px] h-[350px] p-5 justify-center rounded-[30px] z-50"
    >
      <div class="flex flex-col relative">
        <button class="absolute right-3" @click="emit('click')">
          <VIcon
            :alt="'ces-cross'"
            :icon="'ces-cross'"
            class="text-sm text-red-600"
          />
        </button>
        <div class="flex flex-col pt-3 w-full">
          <p class="mb-3 w-full h-6 text-cream">Name: {{ cardData.name }}</p>
          <p class="mb-3 w-full h-6 text-cream">
            Year: {{ cardData.yearLevel }}
          </p>
          <p class="mb-2 w-full h-6 text-cream">
            Course: {{ cardData.course }}
          </p>
        </div>
        <div class="flex flex-row justify-center items-center mt-16 relative">
          <div class="flex flex-row items-center justify-center">
            <button
              class="rounded-full bg-light-green text-cream w-24 p-2 mr-10"
              @click="emit('accept')"
            >
              ACCEPT
            </button>
            <button
              class="rounded-full bg-red-600 text-cream w-24 p-2"
              @click="emit('reject')"
            >
              REJECT
            </button>
          </div>
        </div>
      </div>
      <div class="absolute bottom-12 right-12">
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
</template>

<script setup lang="ts">
  const { timeConverter } = useTools()

  interface card {
    cardData: {
      id?: string
      name?: string
      yearLevel?: string
      course?: string
    }
  }

  interface Emit {
    (e: 'click' | 'accept' | 'reject' | 'fullPage'): void
  }

  const emit = defineEmits<Emit>()

  withDefaults(defineProps<card>(), () => ({
    cardData: {
      id: '',
      name: '',
      yearLevel: '',
      course: ''
    }
  }))
</script>
