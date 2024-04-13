<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-green w-[220px] h-[150px] relative p-1 rounded-lg"
    >
      <button
        class="flex grow justify-center items-center bg-red-200 px-3 overflow-auto"
        @click="toggleCard"
      >
        <p>{{ cardData.name }}</p>
      </button>
      <div class="flex flex-row mb-1 relative h-5">
        <div class="flex flex-row ml-7 justify-center items-center">
          <VIcon
            :alt="'ces-camera'"
            :icon="'ces-camera'"
            size="medium"
            class="mr-3"
          />

          <VIcon
            :alt="'ces-image'"
            :icon="'ces-image'"
            size="medium"
            class="mr-3"
          />

          <VIcon
            :alt="'ces-file-text2'"
            :icon="'ces-file-text2'"
            size="medium"
            class="mr-3"
          />
        </div>
        <div class="grow absolute right-8">
          <button @click="toggleCard">
            <VIcon :alt="'ces-eye'" :icon="'ces-eye'" size="large" />
          </button>
        </div>
      </div>
    </div>

    <cardDescription
      v-if="showCard"
      :card-data="cardData"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 w-[380px] p-5 justify-center rounded-[30px] z-50"
      @click="toggleCard"
      @join="emit('join')"
      @fullPage="emit('fullPage')"
    />
  </div>
</template>

<script setup lang="ts">
  const showCard = ref(false)

  interface card {
    cardData: {
      name?: string
      description?: string
      where?: string
      when?: string
    }
  }

  const toggleCard = () => {
    showCard.value = !showCard.value
  }

  interface Join {
    (e: 'join' | 'fullPage'): void
  }

  const emit = defineEmits<Join>()

  withDefaults(defineProps<card>(), () => ({
    cardData: {
      name: '',
      description: '',
      where: '',
      when: ''
    }
  }))
</script>
