<template>
  <i :class="[icon, size]" />
</template>

<script setup lang="ts">
  interface Prop {
    icon: string
    size?: 'small' | 'medium' | 'large' | 'x-large'
  }
  const props = withDefaults(defineProps<Prop>(), {
    size: 'small'
  })

  const size = computed(() => {
    switch (props.size) {
      case 'small':
        return 'text-sm'
      case 'medium':
        return 'text-md'
      case 'large':
        return 'text-lg'
      case 'x-large':
        return 'text-3xl'
      default:
        return 'text-md'
    }
  })
</script>
