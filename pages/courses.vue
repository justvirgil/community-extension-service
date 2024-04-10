<template>
  <div class="bg-blue-500">
    <p>Courses</p>
    <div class="bg-blue-200 text-[50px]">
      <p v-for="(item, index) in courses" :key="index">{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
  const { authorizedUser, courses, getCourses } = useFirebaseAuth()
  const { read } = useFirestore()

  onMounted(async () => {
    await authorizedUser()
    await getCourses()
  })

  console.log('content', courses)

  definePageMeta({
    layout: 'member'
  })
</script>
