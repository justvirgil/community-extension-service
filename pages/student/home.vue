<template>
  <div class="flex flex-col h-full w-full bg-yellow">
    <header class="flex flex-row bg-green border-2 border-red-700">
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16">
          <VIcon :alt="'ces-home'" :icon="'ces-home'" size="large" />
          <p class="text-xl ml-2">{{ pageTitle }}</p>
        </div>
        <div class="flex items-center justify-center mr-5">
          <NuxtLink to="/student/faq" class="mx-3 text-xl">
            <VIcon :alt="'ces-question'" :icon="'ces-question'" size="medium" />
          </NuxtLink>
          <NuxtLink
            to="/student/notification"
            class="mx-3 text-xl flex flex-row items-center justify-center"
          >
            <VIcon :alt="'ces-bell'" :icon="'ces-bell'" size="medium" />
            <p
              v-if="unreadNotification > 0"
              class="absolute top-[30px] right-[70px] bg-red-800 rounded-full h-5 w-5 flex items-center justify-center text-sm"
            >
              {{ unreadNotification }}
            </p>
          </NuxtLink>
          <div class="relative" @click="toggleDropDown">
            <button class="mx-3 text-xl">
              <VIcon :alt="'ces-menu'" :icon="'ces-menu'" size="medium" />
            </button>
            <div
              v-if="isOpen"
              class="absolute top-full right-0 mt-2 w-28 bg-white border border-gray-300 shadow-lg"
            >
              <ul>
                <li class="flex flex-row justify-center items-center">
                  <VIcon :alt="'ces-user'" :icon="'ces-user'" size="medium" />
                  <NuxtLink
                    to="/student/profile"
                    class="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200"
                    >Profile</NuxtLink
                  >
                </li>
                <li class="flex flex-row justify-center items-center">
                  <VIcon :alt="'ces-exit'" :icon="'ces-exit'" size="medium" />
                  <a
                    class="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200 cursor-pointer"
                    @click="logUserOut"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <div class="bg-red-400 p-3 text-xl text-start w-full">
      <p>Hello user! Here are your recent activities!</p>
    </div>

    <div
      class="flex flex-row m-5 bg-blue-200 h-full overflow-x-auto justify-center"
    >
      <div class="grow flex flex-col items-center">
        <p class="mt-5 text-2xl">completed</p>
        <div class="py-5">
          <activity-card
            v-for="(item, index) in userActivityCompleted"
            :key="index"
            :card-data="item"
            class="py-2"
            @join="join(item.id)"
            @upload-image="uploadActivity"
            @upload-files="uploadActivity"
          />
        </div>
      </div>

      <div class="grow flex flex-col items-center">
        <p class="mt-5 text-2xl">pending</p>
        <div class="py-5">
          <activity-card
            v-for="(item, index) in userActivityPending"
            :key="index"
            :card-data="item"
            class="py-2"
            @join="join(item.id)"
          />
        </div>
      </div>

      <div class="grow flex flex-col items-center">
        <p class="mt-5 text-2xl">upcoming</p>
        <div class="py-5">
          <activity-card
            v-for="(item, index) in userActivityUpcoming"
            :key="index"
            :card-data="item"
            class="py-2"
            @join="join(item.id)"
          />
        </div>
      </div>

      <div class="grow flex flex-col items-center">
        <p class="mt-5 text-2xl">cancelled</p>
        <div class="py-5">
          <activity-card
            v-for="(item, index) in userActivityCancelled"
            :key="index"
            :card-data="item"
            class="py-2"
            @join="join(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const {
    authorizedUser,
    userUID,
    getUserProfile,
    addNotification,
    logout,
    dataFetched,
    activity,
    getActivities,
    joinActivity,
    getProfile,
    profile,
    getNotification,
    updateNotification,
    notification,
    unreadNotification,
    getUserAcitivities,
    userActivityCompleted,
    userActivityPending,
    userActivityUpcoming,
    userActivityCancelled,
    getUserUID
  } = useFirebaseAuth()

  const { generateUUID } = useTools()
  const { uploadFiles } = useFirestorage()

  const pageTitle = ref('Home')
  const date = ref(new Date())
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

  const notify = async () => {
    try {
      await addNotification({
        activityId: '123',
        isRead: false,
        message: 'test',
        sender: 'sender',
        timestamp: date.value
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateNotif = async () => {
    try {
      await updateNotification()
      console.log('update notification')
    } catch (error) {
      console.log(error)
    }
  }

  const uploadActivity = async (event, activityId) => {
    try {
      const file = event.target.files[0]
      const userId = getUserUID()
      if (userId && file) {
        await uploadFiles(userId, activityId, file)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/')
  }

  onMounted(async () => {
    await authorizedUser()
    await getUserProfile()
    await getActivities()
    await getProfile()
    await getNotification()
    await getUserAcitivities()
  })

  console.log('content', activity)

  definePageMeta({
    layout: 'member'
  })
</script>
