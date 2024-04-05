<template>
  <div class="bg-blue-200 text-[50px]">
    <NuxtPage />
    <div class="bg-white text-black [50px]">
      <p v-for="(course, index) in courses" :key="index">{{ course.name }}</p>
    </div>
  </div>
</template>

<script setup>
  const { authorizedUser, getStudents, getCourses, students, courses } = useFirebaseAuth()

  onMounted( async () => {
    await authorizedUser()
    await getStudents()
    await getCourses()
  })

  definePageMeta({
    layout: 'member'
  })
</script>
