<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-light-blue border-b border-l border-dark-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon :alt="'ces-student'" :icon="'ces-student'" size="large" />
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

    <div class="overflow-y-auto">
      <div class="flex flex-col items-center">
        <div
          class="bg-dark-blue py-3 px-4 flex items-start justify-between text-xl text-center w-full text-nowrap"
        >
          <NuxtLink
            class="flex flex-row justify-center items-center w-36 rounded-xl mx-3 bg-dark-blue text-cream hover:bg-light-blue"
            to="/admin/students/"
          >
            <VIcon
              :alt="'ces-circle-left'"
              :icon="'ces-circle-left'"
              size="large"
            />
            <p class="ml-3">BACK</p>
          </NuxtLink>
        </div>

        <div class="bg-yellow w-[30rem] h-[13rem] p-7 rounded-md relative my-2">
          <p class="ml-12">S T U D E N T</p>
          <div class="flex flex-row items-center pt-3 px-10">
            <div class="h-28 w-28">
              <VIcon
                v-if="!profile.avatar"
                :alt="'ces-user'"
                :icon="'ces-user'"
                class="text-[7rem] mr-2 h-full w-full"
              />
              <img
                v-if="profile.avatar"
                :src="profile.avatar"
                alt="Avatar"
                class="h-28 w-28"
              />  
            </div>
            <div class="flex flex-col ml-5">
              <p>{{ profile.name }}</p>
              <p>{{ profile.yearLevel }}</p>
              <p>{{ profile.course }}</p>
              <p>{{ profile.email }}</p>
            </div>
          </div>
          <p class="pt-6 absolute right-10 bottom-5">{{ profile.id }}</p>
        </div>

        <div
          class="bg-dark-blue py-3 px-4 flex items-start text-xl text-center w-full text-nowrap"
        >
          <button
            class="w-36 rounded-xl mx-3 bg-dark-blue text-cream ml-5 hover:bg-light-blue"
            @click="filterActivities('completed')"
          >
            Completed
          </button>

          <button
            class="w-36 rounded-xl mx-3 bg-dark-blue text-cream ml-5 hover:bg-light-blue"
            @click="filterActivities('pending')"
          >
            Approval
          </button>

          <button
            class="w-36 rounded-xl mx-3 bg-dark-blue text-cream ml-5 hover:bg-light-blue"
            @click="filterActivities('cancelled')"
          >
            Cancelled
          </button>
        </div>
      </div>

      <div class="flex flex-row h-[166px] overflow-x-auto">
        <admin-activity-card
          v-for="(item, index) in profileActivity"
          :key="index"
          :card-data="item"
          class="py-2 mx-2"
          @click="handleActivitySelection(item.activityId)"
        />
      </div>
      <div
        class="bg-dark-blue py-3 px-4 flex items-start justify-between text-xl text-center w-full text-nowrap"
      >
        <div
          class="flex flex-row justify-center items-center w-36 rounded-xl mx-3 bg-dark-blue text-cream"
        >
          <p class="ml-3">POINTS</p>
        </div>
      </div>
      <div class="h-16 flex flex-row items-center justify-center">
        <div class="flex items-center justify-center">
          <button
            class="bg-red-400 mx-1 flex items-center justify-center rounded-full h-10 w-10"
            @click="minusPoint"
          >
            <VIcon
              class="text-cream flex items-center justify-center"
              :alt="'ces-minus'"
              :icon="'ces-minus'"
              size="medium"
            />
          </button>

          <VTextField
            v-model="points"
            type="number"
            placeholder="Enter Points"
            class="w-20 h-12 text-black"
            disabled
          />

          <button
            class="bg-light-green mx-1 flex items-center justify-center rounded-full h-10 w-10"
            @click="addPoint"
          >
            <VIcon
              class="text-cream flex items-center justify-center"
              :alt="'ces-plus'"
              :icon="'ces-plus'"
              size="medium"
            />
          </button>

          <button class="bg-gray-500 hover:bg-gray-600 mx-1 flex items-center justify-center rounded-full h-10 w-40 transition-colors duration-300 ease-in-out" @click="submitPoints">
            <p class="text-white">Submit Points</p>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const {
    authorizedUser,
    logout,
    getStudentsIds,
    allStudentId,
    getNotification,
    updateNotification,
    notification,
    unreadNotification,
    getStudentProfile,
    profile,
    getStudentAcitivities,
    userActivityCompleted,
    userActivityPending,
    userActivityCancelled,
    selectedActivityId,
    getActivityById,
    specificActivity,
    profileActivity,
    getProfileById,
    getProfileActivityById,
    studentActivityWithinProfile,
    submitActivityPoints,
    joinActivity
  } = useFirebaseAuth()

  const pageTitle = ref('Student')
  const date = ref(new Date())
  const isOpen = ref(false)
  const selectedActivityId2 = ref('')
  const points = ref(0)
  const route = useRoute()
  const anchor = useState(() => [])
  const filteredUserActivity = ref(
    anchor === null ? userActivityCompleted : anchor
  )
  const routerID = route.params.slug
  const errorMessage = ref('')

  const handleActivitySelection = async (activityId) => {
    await getActivityById(activityId)
  }

  const filterActivities = (status) => {
    switch (status) {
      case 'completed':
        filteredUserActivity.value = userActivityCompleted
        break
      case 'pending':
        filteredUserActivity.value = userActivityPending
        break
      case 'cancelled':
        filteredUserActivity.value = userActivityCancelled
        break
      default:
        filteredUserActivity.value = userActivityCompleted
        break
    }
  }


  const addPoint = async () => {
    return points.value < 3 ? points.value += 1 : points.value
  }

  const minusPoint = async () => {
    return points.value > 0 ? points.value -= 1 : points.value
  }


  const submitPoints = async () => {
    try {
      if (selectedActivityId.value) {
        await submitActivityPoints(routerID, selectedActivityId.value, points.value)
      }
      points.value = 0
    } catch (error) {
      errorMessage.value = `${error}`
      console.log(error)
    }
  }

  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/admin/login')
  }

  onMounted(async () => {
    await authorizedUser()
    await getNotification()
    await getProfileById(routerID)
    await getProfileActivityById(routerID, selectedActivityId.value)
    await getStudentAcitivities(routerID)
    await getStudentsIds()
  })

  definePageMeta({
    layout: 'admin'
  })
</script>
