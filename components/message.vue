<template>
  <section class="w-full">
      <div class="flex flex-col" 
      :class="{
      	'items-end': props.isSender,
      	'items-start': !props.isSender,
      	'justify-end': props.isSender,
      	'justify-start': !props.isSender
  	  }">
      	<p>{{ username }}</p>
 				<slot />
      </div>
  </section>
</template>

<script setup lang="ts">
interface Prop {
	username: string
	isSender: boolean
}

const props = withDefaults(defineProps<Prop>(),{
	username: '',
	isSender: false
})
</script>
