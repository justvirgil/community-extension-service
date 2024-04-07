<template>
  <div class="flex flex-row">
    <div class="flex flex-col bg-green w-[220px] h-[150px] relative p-1 rounded-lg">
      <button class="flex grow justify-center items-center bg-red-200 px-3 overflow-auto" @click="toggleCard">
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
           <VIcon
              :alt="'ces-eye'"
              :icon="'ces-eye'"
              size="large"
            />
          </button>
        </div>
      </div>
    </div>

    <cardDescription
      v-if="showCard"
      :cardData="cardData"
    />

  </div>
</template>


<script setup lang="ts">
const showCard = ref(false)

  interface Prop {
    title?: string
  }

  interface cardData {
    cardData: {
      name?: string
      description?: string
      where?: string
      when?: string
    }
  }

  // interface Emit {
  //   (e: 'click'): void
  // }

  // const emit = defineEmits<Emit>()

  const toggleCard = () => {
   showCard.value = !showCard.value
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