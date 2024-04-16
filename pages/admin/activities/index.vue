<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-light-blue border-b border-l border-dark-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon :alt="'ces-book'" :icon="'ces-book'" size="large" />
          <p class="text-xl ml-2">{{ pageTitle }}</p>
        </div>
        <div class="flex items-center justify-center mr-5">
          <NuxtLink
            to="/admin/notification"
            class="mx-3 text-xl text-white flex flex-row items-center justify-center"
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
            <button class="mx-3 text-xl text-white">
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
                    to="/admin/profile"
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
    <div class="grow flex flex-col items-center">
      <div
        class="bg-light-blue py-3 px-4 flex items-start text-xl text-center w-full"
      >
        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          @click="allActivities"
        >
          All
        </button>

        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          @click="filterActivities('completed')"
        >
          Completed
        </button>

        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          @click="filterActivities('pending')"
        >
          Approval
        </button>

        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          @click="filterActivities('upcoming')"
        >
          Upcoming
        </button>
      </div>

      <div class="bg-dark-blue text-cream w-full p-3">
        <p class="pl-5">{{ tabName }}</p>
      </div>
    </div>

    <div class="m-3 h-full bg-white overflow-x-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <admin-activity-card
          v-for="(item, index) in filteredActivities"
          :key="index"
          :card-data="item"
          @join="join(item.id)"
          @full-page="redirectToApproved(item.id)"
        />
      </div>
      <div class="flex flex-row justify-end mr-8 mt-10">
        <NuxtLink
          to="/admin/activities/add"
          class="bg-red-400 mx-1 flex items-center justify-center rounded-full h-10 w-10"
        >
          <VIcon
            :alt="'ces-plus'"
            :icon="'ces-plus'"
            size="medium"
            class="text-cream flex items-center justify-center"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  const {
    authorizedUser,
    logout,
    userUID,
    activity,
    getActivities,
    joinActivity,
    removeActivity,
    specificActivity,
    getActivityById,
    filterActivitiesByStatus,
    filteredActivities,
    filterAllActivities,
    getNotification,
    unreadNotification
  } = useFirebaseAuth()
  const { add, read } = useFirestore()

  const readContent = ref([])
  const tabName = ref('ALL')
  const pageTitle = ref('Activities')
  const isOpen = ref(false)

  const router = useRouter()
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

  const redirectToApproved = async (activityId) => {
    try {
      router.push(`/admin/activities/id/${activityId}`)
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

  const allActivities = async () => {
    try {
      await filterAllActivities()
      tabName.value = 'ALL'
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const filterActivities = async (status) => {
    try {
      await filterActivitiesByStatus(status)
      tabName.value = `${status.toUpperCase()}`
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/')
  }

  onMounted(async () => {
    await authorizedUser()
    await getNotification()
    await filterAllActivities()
  })

  const fetchContent = async () => {
    if (!authorizedUser()) {
      throw new Error('Not authorized')
    }
    readContent.value = await read('activities')
  }

  definePageMeta({
    layout: 'admin'
  })
</script>
