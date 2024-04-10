<template>
  <div>
    <input
      v-bind="$attrs"
      class="rounded-full placeholder-green-600 text-start pl-7 text-xs focus:outline-none focus:none"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateModelValue"
    />
    <div>
      <span v-if="isError" class="flex text-[10px] text-red-600">
        <slot name="error" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Prop {
    modelValue?: string | number
    isError?: boolean
    placeholder?: string
  }

  const emit = defineEmits(['update:modelValue'])

  withDefaults(defineProps<Prop>(), {
    modelValue: '',
    placeholder: 'Input here'
  })

  const updateModelValue = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLFormElement).value)
  }
</script>
