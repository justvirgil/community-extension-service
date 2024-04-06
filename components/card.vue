<template>
	<div class="flex flex-col bg-green w-[220px] h-[150px] relative p-1 rounded-lg">
		<div class="flex grow justify-center items-center bg-red-200 px-3 overflow-auto">
			<p>{{ title }}</p>
		</div>
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
       <VIcon
          :alt="'ces-eye'"
          :icon="'ces-eye'"
          size="large"
        />
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">
  interface Prop {
    title?: string
  }

  interface Emit {
    (e: 'click'): void
  }

  const emit = defineEmits<Emit>()

  const props = withDefaults(defineProps<Prop>(), {
    title: ''
  })
</script>