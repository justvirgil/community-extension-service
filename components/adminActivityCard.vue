<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-dark-blue w-[220px] h-[150px] relative p-1 rounded-lg"
      :class="{ 'bg-[#631689]': isSelected }"
      @click="selectActivity(cardData.id)"
    >
      <button
        class="flex grow justify-center items-center bg-light-blue px-3 overflow-auto"
        @click="emit('fullPage')"
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
          />
          <button @click="$refs.imageInput.click()">
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
          />
          <button @click="$refs.fileInput.click()">
            <VIcon
              :alt="'ces-file-text'"
              :icon="'ces-file-text'"
              size="medium"
              class="mr-3 text-cream"
            />
          </button>
        </div>
        <div class="grow absolute right-8">
          <button @click="emit('fullPage')">
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
</template>

<script setup lang="ts">
  const showCard = ref(false)

  interface card {
    cardData: {
      id?: string
      name?: string
      description?: string
      where?: string
      when?: string
    }
  }

  const selectedActivityId = ref<string | null>('')
  const isSelected = ref(false)

  const selectActivity = (activityId: string) => {
    if (selectedActivityId.value === activityId) {
      selectedActivityId.value = null
      isSelected.value = false
      console.log('deselect')
    } else {
      selectedActivityId.value = activityId
      isSelected.value = true
      console.log(selectedActivityId.value)
    }
  }

  interface Join {
    (e: 'join' | 'fullPage' | 'uploadImage' | 'uploadFiles' | 'selected'): void
  }

  const emit = defineEmits<Join>()

  withDefaults(defineProps<card & { disabled?: boolean }>(), () => ({
    cardData: {
      id: '',
      name: '',
      description: '',
      where: '',
      when: ''
    },
    disabled: false
  }))
</script>
