<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-dark-blue w-[220px] h-[150px] relative p-1 rounded-lg"
    >
      <button
        class="flex flex-col grow justify-center items-center bg-light-blue p-5 overflow-auto"
        @click="toggleCard"
        :disabled="disabled"
      >
        <VIcon
          v-if="!cardData.avatar"
          :alt="'ces-user'"
          :icon="'ces-user'"
          class="text-xl h-16 w-16 flex items-center justify-center"
        />
        <img
          v-if="cardData.avatar"
          :src="cardData.avatar"
          alt="Avatar"
          class="h-16 w-16"
        />
        <p class="text-xl text-cream">{{ cardData.name }}</p>
      </button>

      <div class="flex flex-row relative h-6 items-center">
        <div class="grow absolute right-8">
          <button @click="toggleCard" :disabled="disabled">
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

    <student-card-description
      v-if="showCard"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-blue w-[380px] p-5 justify-center rounded-[30px] z-50"
      :card-data="cardData"
      @click="toggleCard"
      @accept="emit('accept')"
      @reject="emit('reject')"
      @fullPage="emit('fullPage')"
    />
  </div>
</template>

<script setup lang="ts">
  const showCard = ref(false)

  interface card {
    cardData: {
      id?: string
      avatar?: string
      name?: string
      yearLevel?: string
      course?: string
      joinedActivities?: { [key: string]: { name?: string }}
    }
  }

  const toggleCard = () => {
    showCard.value = !showCard.value
  }

  interface Emit {
    (e: 'click' | 'accept' | 'reject' | 'fullPage'): void
  }

  const emit = defineEmits<Emit>()

  withDefaults(defineProps<card & { disabled?: boolean }>(), () => ({
    cardData: {
      id: '',
      avatar: '',
      name: '',
      description: ''
    },
    disabled: false
  }))
</script>
