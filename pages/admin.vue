<template>
  <div class="bg-blue-200 text-[50px]">
    <p>Admin Content</p>
    <button class="text-black" @click="logUserOut">
      logout
    </button>
    <p>{{ errorMessage }} </p>
  </div>
</template>

<script setup>
  const { authorizedUser, logout, errorMessage } = useFirebaseAuth()

  onMounted( async () => {
    await authorizedUser()
  })

  const logUserOut = async() => {
    await logout()
    navigateTo('/adminLogin')
  }

  definePageMeta({
    layout: 'member'
  })
</script>
