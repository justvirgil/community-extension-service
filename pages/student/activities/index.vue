<template>
  <div class="flex flex-col h-full w-full bg-yellow">
    
      <header class="flex flex-row bg-green border-2 border-red-700">
        <nav class="flex flex-row my-8 grow">
          <div class="flex flex-row items-center grow ml-16">
           <VIcon
              :alt="'ces-home'"
              :icon="'ces-home'"
              size="large"
            />
            <p class="text-xl ml-2">{{ pageTitle }}</p>
          </div>
          <div class="flex items-center justify-center mr-5">
            <NuxtLink to="/student/faq" class="mx-3 text-xl">
             <VIcon
                :alt="'ces-question'"
                :icon="'ces-question'"
                size="medium"
              />
            </NuxtLink>
            <NuxtLink to="/student/notification" class="mx-3 text-xl">
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
                <li class="flex flex-row justify-center items-center">
                 <VIcon
                    :alt="'ces-user'"
                    :icon="'ces-user'"
                    size="medium"
                  />
                  <NuxtLink to="/student/profile" class="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200">Profile</NuxtLink>
                </li>
                <li class="flex flex-row justify-center items-center">
                 <VIcon
                    :alt="'ces-exit'"
                    :icon="'ces-exit'"
                    size="medium"
                  />
                  <a @click="logUserOut" class="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200 cursor-pointer">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </nav>
      </header>
        <div class="grow flex flex-col items-center">
          <div class="bg-red-400 py-3 px-4 flex items-start text-xl text-center w-full">

             <VButton
                class="w-34 mx-3"
              >
                All
            </VButton>

             <VButton
                class="w-34 mx-3"
              >
                Completed
            </VButton>


             <VButton
                class="w-34 mx-3"
              >
                Approval
            </VButton>

             <VButton
                class="w-34 mx-3"
              >
                Upcoming
            </VButton>

          </div>

          <div class="bg-blue-200 w-full p-3">
            <p class="pl-5">
              Hello
            </p>
          </div>
      </div>

      <div class="m-3 h-full bg-white overflow-x-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <card v-for="(item, index) in activity" :key="index" :card-data="item" @join="join(item.id)" />
        </div>
      </div>
    </div>
</template>

<script setup>
  const { authorizedUser, logout, userUID, activity, getActivities, joinActivity, removeActivity } = useFirebaseAuth()
  const { add, read } = useFirestore()

  const readContent = ref([])
  const pageTitle = ref('Activities')
  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const join = async (activityId) => {
    try {
      await joinActivity(activityId, userUID.value)
    } catch (error) {
      errorMessage.value = `${error}`
    } 
  }

  const remove = async (activityId) => {
    try {
      await removeActivity(activityId, userUID.value)
    } catch (error) {
      errorMessage.value = `${error}`
    } 
  }

  const logUserOut = async() => {
    await logout()
    navigateTo('/')
  }

  onMounted(async () => {
    await authorizedUser()
    await getActivities()
  })


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
