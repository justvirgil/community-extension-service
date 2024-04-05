<template>
  <div class="bg-blue-500">
    <p>Students</p>
    <div class="bg-blue-200 text-[50px]">
      <p v-for="(item, index) in readContent" :key="index">{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
  const { authorizedUser } = useFirebaseAuth()
  const { read } = useFirestore()

  const readContent = ref([])

  onMounted(async () => {
    await authorizedUser()
    await fetchContent()
  })

  const fetchContent = async () => {
    if(!authorizedUser()){
      throw new Error("Not authorized")
    }
    readContent.value = await read("pendingUsers")
  }

  console.log("content",readContent.value)

  definePageMeta({
    layout: 'member'
  })
</script>
