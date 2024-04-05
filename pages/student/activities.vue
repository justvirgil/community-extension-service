<template>
  <div class="flex flex-col h-full w-full bg-yellow">

    <header class="flex flex-row bg-green border-2 border-red-700">
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16">
         <VIcon
            :alt="'ces-book'"
            :icon="'ces-book'"
            size="large"
          />
          <p class="text-xl ml-2">{{ pageTitle }}</p>
        </div>
        <div class="flex items-center justify-center mr-5">
          <NuxtLink to="/member" class="mx-3 text-xl">
           <VIcon
              :alt="'ces-question'"
              :icon="'ces-question'"
              size="medium"
            />
          </NuxtLink>
          <NuxtLink to="/member" class="mx-3 text-xl">
           <VIcon
              :alt="'ces-bell'"
              :icon="'ces-bell'"
              size="medium"
            />
          </NuxtLink>
          <div class="relative" @click="toggleDropDown">
            <button class="mx-3 text-xl">
             <VIcon
                :alt="'ces-menu'"
                :icon="'ces-menu'"
                size="medium"
              />
            </button>
          <div v-if="isOpen" class="absolute top-full right-0 mt-2 w-28 bg-white border border-gray-300 shadow-lg">
            <ul>
              <li><NuxtLink to="/student/profile" class="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200">Profile</NuxtLink></li>
              <li><a @click="logUserOut" class="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200 cursor-pointer">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      </nav>
    </header>

    <p>Activities Content</p>
    <div class="bg-orange-200">
      <button @click="addActivity">Add activity</button>
    </div>
    <p>Display activities</p>
    <p v-for="(item, index) in readContent" :key="index">{{ item.name }}</p>
  </div>
</template>

<script setup>
  const { authorizedUser, logout } = useFirebaseAuth()
  const { add, read } = useFirestore()

  const readContent = ref([])
  const pageTitle = ref('Activities')
  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const logUserOut = async() => {
    await logout()
    navigateTo('/')
  }

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
    if(!authorizedUser()){
      throw new Error("Not authorized")
    }
    await add("sample", {
      id: "2",
      name: "hello",
      year: 2
    })
  }

  const fetchContent = async () => {
    if(!authorizedUser()){
      throw new Error("Not authorized")
    }
    readContent.value = await read("activities")
  }

  console.log("content",readContent.value)

  definePageMeta({
    layout: 'member'
  })
</script>
