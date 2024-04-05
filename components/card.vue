<template>
	<div class="bg-red-500">
		<div class="">
			{{ title }}
		</div>
		<div>
			<div>
				<p>One</p>
				<p>Two</p>
				<p>Three</p>
			</div>
			<div>
				<p>Eye</p>
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