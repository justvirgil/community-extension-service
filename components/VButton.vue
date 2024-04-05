<template>
  <button
    class="bg-green hover:bg-green/80 text-white font-bold py-2 px-4 "
    :class="{ 'font-bold': props.isBold, 'font-normal': !props.isBold, 'rounded-full': isRounded }"
    v-bind="$attrs"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  interface Prop {
    isBold?: boolean
    isRounded?: boolean
  }

  interface Emit {
    (e: 'click'): void
  }

  const emit = defineEmits<Emit>()

  const props = withDefaults(defineProps<Prop>(), {
    isBold: false,
    isRounded: false
  })
</script>
