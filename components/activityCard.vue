<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-dark-blue w-[220px] h-[150px] relative p-1 rounded-lg"
    >
      <button
        class="flex grow justify-center items-center bg-light-blue px-3 overflow-auto"
        @click="toggleCard"
        :disabled="disabled"
      >
        <p class="text-xl text-cream">{{ cardData.name }}</p>
      </button>
      <div class="flex flex-row relative h-6 items-center">
        <div class="flex flex-row ml-7 justify-center items-center">
          <input
            type="file"
            accept="image/*"
            class="hidden"
            ref="imageInput"
            @change="(event) => emit('uploadImage', event, cardData.id)"
            :disabled="disabled"
          />
          <button @click="$refs.imageInput.click()" :disabled="disabled">
            <VIcon
              :alt="'ces-image'"
              :icon="'ces-image'"
              size="medium"
              class="mr-3 text-cream"
            />
          </button>

          <input
            type="file"
            class="hidden"
            ref="fileInput"
            @change="(event) => emit('uploadFiles', event, cardData.id)"
            :disabled="disabled"
          />
          <button @click="$refs.fileInput.click()" :disabled="disabled">
            <VIcon
              :alt="'ces-file-text'"
              :icon="'ces-file-text'"
              size="medium"
              class="mr-3 text-cream"
            />
          </button>
        </div>
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

    <cardDescription
      v-if="showCard"
      :card-data="cardData"
      :button-name="buttonName"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-blue w-[380px] p-5 justify-center rounded-[30px] z-50"
      @click="toggleCard"
      @join="emit('join')"
      @fullPage="emit('fullPage')"
    />
  </div>
</template>

<script setup lang="ts">
  const showCard = ref(false)
  const buttonName = ref('View Activity')

  interface card {
    cardData: {
      id?: string
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
    (e: 'join' | 'fullPage' | 'uploadImage' | 'uploadFiles'): void
  }

  const emit = defineEmits<Join>()

  withDefaults(
    defineProps<card & { disabled?: boolean; buttonName?: string }>(),
    () => ({
      cardData: {
        id: '',
        name: '',
        description: '',
        where: '',
        when: ''
      },
      disabled: false,
      buttonName: 'JOIN ACTIVITY'
    })
  )
</script>
