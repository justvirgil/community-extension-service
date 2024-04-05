<template>
  <div class="bg-blue-200 text-[50px] w-full h-full">
    <p>Member Content</p>
    <button class="text-black" @click="logUserOut">
      logout
    </button>
    <p>{{ dataFetched }} </p>
  </div>
</template>

<script setup>
  const { authorizedUser, logout, dataFetched } = useFirebaseAuth()

  onMounted( async () => {
    await authorizedUser()
  })

  const logUserOut = async() => {
    await logout()
    navigateTo('/')
  }

  definePageMeta({
    layout: 'member'
  })
</script>
