<template>
	<div class="flex flex-col bg-red-500 w-[220px] h-[150px] relative">
		<div class="flex grow justify-center items-center">
			{{ title }}
		</div>
		<div class="flex flex-row pb-3">
			<div class="flex flex-row grow justify-center items-center">

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
			<div class="grow ml-12">
       <VIcon
          :alt="'ces-eye'"
          :icon="'ces-eye'"
          size="medium"
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