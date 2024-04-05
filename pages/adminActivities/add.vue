<template>
  <div class="bg-orange-500 text-l">
    <p>Add Activity</p>
      <form class="flex flex-col items-center justify-center" @submit.prevent="createActivity">
        <div class="h-5">
          <p v-if="errorMessage" class="text-red-500 text-xs font-bold">{{ errorMessage }}</p>
          <p v-else-if="authError" class="text-red-500 text-xs font-bold">{{ authError }}</p>
        </div>
        <VTextField v-model="name" type="text" placeholder="first name" class="w-80 h-12 text-black m-2" />
        <VTextField v-model="description" type="text" placeholder="last name" class="w-80 h-12 text-black m-2" />
        <VTextField v-model="location" type="email" placeholder="email" class="w-80 h-12 text-black m-2" />
        <VTextField v-model="where" type="password" placeholder="password" class="w-80 h-12 text-black m-2" />
        <VTextField v-model="when" type="password" placeholder="confirm password" class="w-80 h-12 text-black m-2" />
        <VButton
          class="w-28 mt-6"
          :is-bold="true"
          :is-rounded="true"
          type="submit"
        >
          CREATE ACTIVITY
        </VButton>
      </form>
  </div>
</template>

<script setup>
  import { v4 as uuidv4 } from 'uuid'
  const { authorizedUser, userUID, getUserUID, addActivity } = useFirebaseAuth()
  const { add, read } = useFirestore()
  const name = ref('')
  const description = ref('')
  const location = ref('')
  const where = ref('')
  const when = ref('')

  const readContent = ref([])

  onMounted(async () => {
    await authorizedUser()
    await fetchContent()
    await getUserUID()
  })

  const generateUUID = () => {
    return uuidv4().replace(/-/g, '').substring(0, 20)
  }

  const uuid = generateUUID()
  console.log("Generated UUID:", uuid)

  const createActivity = async () => {
    try {
      await addActivity(uuid, {
        name: "bbb",
        description: "bbb",
        location: "bbb",
        where: "bbb",
        when: 1711460873,
        what: "bbb",
        yearLevel: 0,
        createdAt: 1711460873,
        updatedAt: 1711460873,
        createdBy: "bbb",
        status: "bbb",
        approvedAt: 1711460873,
        approvedBy: "bbb",
        isCompleted: false,
        pendingUsers: [],
        approvedUsers: [],
        rejectedUsers: []
      })
    } catch (error) {
      console.error(error)
    }
  }

  // const addActivity = async () => {
  //   if(!authorizedUser()){
  //     throw new Error("Not authorized")
  //   }
  //   await add("sample", {
  //     id: "2",
  //     name: "hello",
  //     year: 2
  //   })
  // }

  const fetchContent = async () => {
    if(!authorizedUser()){
      throw new Error("Not authorized")
    }
    readContent.value = await read("activities")
  }

  console.log("USER UID",userUID.value)
  console.log("GET USER UID",getUserUID())

  definePageMeta({
    layout: 'member'
  })
</script>
