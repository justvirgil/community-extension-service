<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-dark-blue border-b border-l border-light-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon :alt="'ces-power'" :icon="'ces-power'" size="large" />
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

    <div class="flex flex-row">
      <div class="grow flex flex-col items-center">
        <div class="bg-light-blue text-cream p-3 text-xl text-start w-full">
          <p>COMPLETED ACTIVITIES</p>
        </div>
        <div class="pt-12 py-auto w-[600px] overflow-auto">
          <div class="bg-cream text-black h-fit">
            <chart
              :labels="chartLabels"
              :datasets="chartDatasets"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const {
    authorizedUser,
    logout,
    activity,
    getUserAllActivities,
    getNotification,
    unreadNotification
  } = useFirebaseAuth()

  const pageTitle = ref('Tracker')
  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const chartLabels = ref([])
  const activityLength = ref(0)
  const completedActivities = ref(0)
  const completionPercentage = ref(0)
  const remainingPercentage = ref(0)

  const chartDatasets = ref([
    {
      backgroundColor: ['#FFFF00', '#00308C '],
      data: [completionPercentage, remainingPercentage]
    }
  ])

  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1
  })

  const logUserOut = async () => {
    await logout()
    navigateTo('/')
  }

  onMounted(async () => {
    await authorizedUser()
    await getNotification()
    await getUserAllActivities()

    chartLabels.value = activity.value
      .filter((item) => item.status === 'completed')
      .map((item) => item.name)

    activityLength.value = activity.value.length
    completedActivities.value = activity.value.filter(
      (item) => item.status === 'completed'
    ).length

    completionPercentage.value =
      (completedActivities.value / activityLength.value) * 100
    remainingPercentage.value = 100 - completionPercentage.value
  })

  definePageMeta({
    layout: 'member'
  })
</script>
