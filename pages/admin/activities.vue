<template>
  <div class="bg-orange-500 text-[50px]">
    <p>Activities Content</p>
    <div class="bg-orange-200">
      <button @click="addActivity">Add activity</button>
    </div>
    <p>Display activities</p>
    <p v-for="(item, index) in readContent" :key="index">{{ item.name }}</p>
  </div>
</template>

<script setup>
  const { authorizedUser } = useFirebaseAuth()
  const { add, read } = useFirestore()

  const readContent = ref([])

  onMounted(async () => {
    await authorizedUser()
    await fetchContent()
  })

  // const addActivity = async () => {
  //   await add("sample", {
  //     name: "bbb",
  //     description: "bbb",
  //     location: "bbb",
  //     where: "bbb",
  //     when: "bbb",
  //     what: "bbb",
  //     yearLevel: "bbb",
  //     createdAt: "bbb",
  //     updatedAt: "bbb",
  //     createdBy: "bbb",
  //     status: "bbb",
  //     approvedAt: "bbb",
  //     approvedBy: "bbb",
  //     isCompleted: "bbb",
  //     pendingUsers: "bbb",
  //     approvedUsers: "bbb",
  //     rejectedUsers: "bbb"
  //   })
  // }

  const addActivity = async () => {
    if (!authorizedUser()) {
      throw new Error('Not authorized')
    }
    await add('sample', {
      id: '2',
      name: 'hello',
      year: 2
    })
  }

  const fetchContent = async () => {
    if (!authorizedUser()) {
      throw new Error('Not authorized')
    }
    readContent.value = await read('activities')
  }

  console.log('content', readContent.value)

  definePageMeta({
    layout: 'member'
  })
</script>
