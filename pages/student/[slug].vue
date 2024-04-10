<template>
  <div class="bg-blue-200 text-[50px]">
    <p>Add Student Course</p>
    <button class="text-black" @click="addCourse">add course</button>
    <p>Student list by name</p>
    <div class="text-[50px]">
      <div
        v-for="(student, index) in students"
        :key="index"
        class="flex flex-row"
      >
        <p class="flex-grow">{{ student.name }}</p>
        <p class="flex-grow">{{ student.course }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { authorizedUser, getStudents, getCourses, students } =
    useFirebaseAuth()

  onMounted(async () => {
    await authorizedUser()
    await getStudents()
  })

  const addCourse = async () => {
    navigateTo('/student')
  }

  definePageMeta({
    layout: 'member'
  })
</script>
