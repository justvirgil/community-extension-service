<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-dark-blue border-b border-l border-light-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon
            :alt="'ces-checkbox-checked'"
            :icon="'ces-checkbox-checked'"
            size="large"
          />
          <p class="text-xl ml-2">{{ pageTitle }}</p>
        </div>
        <div class="flex items-center justify-center mr-5">
          <NuxtLink to="/student/faq" class="mx-3 text-xl text-white">
            <VIcon :alt="'ces-question'" :icon="'ces-question'" size="medium" />
          </NuxtLink>
          <NuxtLink
            to="/student/notification"
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

    <div class="grow flex flex-col items-center">
      <div
        class="bg-light-blue text-cream py-3 px-4 flex items-start text-xl text-center w-full"
      >
        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          :is-rounded="true"
          @click="filterActivities(1)"
        >
          1st year
        </button>

        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          :is-rounded="true"
          @click="filterActivities(2)"
        >
          2nd year
        </button>

        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          :is-rounded="true"
          @click="filterActivities(3)"
        >
          3rd year
        </button>

        <button
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream ml-5 hover:bg-dark-blue"
          :is-rounded="true"
          @click="filterActivities(4)"
        >
          4th year
        </button>
      </div>
    </div>
    <div class="m-3 h-full bg-white overflow-x-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <activity-card
          v-for="(item, index) in filteredActivities"
          :key="index"
          :card-data="item"
          :disabled="isDisabled(item.yearLevel)"
          @join="join(item.id)"
          @full-page="redirectToApproved(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  const {
    authorizedUser,
    logout,
    getProfile,
    getUserYearLevel,
    filterActivitiesByLevel,
    filteredActivities,
    getNotification,
    unreadNotification
  } = useFirebaseAuth()

  const readContent = ref([])
  const pageTitle = ref('Available')
  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const router = useRouter()

  const join = async (activityId) => {
    try {
      router.push(`/student/activities/id/${activityId}`)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const filterActivities = async (year) => {
    try {
      await filterActivitiesByLevel(year)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const redirectToApproved = async (activityId) => {
    try {
      router.push(`/student/activities/id/${activityId}`)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const isDisabled = (year) => {
    try {
      return getUserYearLevel() !== year
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
    await getProfile()
    await getNotification()
    await filterActivitiesByLevel(1)
  })

  definePageMeta({
    layout: 'member'
  })
</script>
