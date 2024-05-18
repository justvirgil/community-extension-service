<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-light-blue border-b border-l border-dark-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon :alt="'ces-pending'" :icon="'ces-pending'" size="large" />
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
    <div class="p-5 grid grid-cols-4 gap-4">
      <studentCard
        v-for="(item, index) in profileActivity"
        :key="index"
        :card-data="item"
        class="w-full"
        @accept="approveStudent(item.id, item)"
        @reject="rejectStudent(item.id, item)"
        @full-page="redirection(item.id)"
      />
    </div>
  </div>
</template>
s
<script setup>
  const {
    authorizedUser,
    getStudents,
    students,
    getNotification,
    addNotification,
    unreadNotification,
    getUserUID,
    getAllActivityStatus,
    profileActivity,
    updateActivityStatus
  } = useFirebaseAuth()

  console.log(profileActivity)

  const pageTitle = ref('Pending')
  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }
  const errorMessage = ref('')
  const router = useRouter()

  const redirection = async (studentId) => {
    try {
      router.push(`/admin/students/pending/${studentId}`)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const approveStudent = async (userId, item) => {
    try {
      const myId = getUserUID()
      const joinedActivityKeys = Object.keys(item.joinedActivities)
      if (joinedActivityKeys.length > 0) {
        const firstJoinedActivityKey = joinedActivityKeys[0]
        const activityId =
          item.joinedActivities[firstJoinedActivityKey].activityId
        await updateActivityStatus(userId, activityId, 'APPROVED')
        await addNotification({
          activityId: `${activityId}`,
          isRead: false,
          message: `${myId} accept ${userId} request`,
          sender: `${myId}`,
          timestamp: date.value
        })
       await router.push('/admin/students')
      } else {
        throw new Error('No joined activities found')
      }
    } catch (error) {
      errorMessage.value = `${error}`
      console.log(error)
    }
  }

  const rejectStudent = async (userId, item) => {
    try {
      const joinedActivityKeys = Object.keys(item.joinedActivities)
      if (joinedActivityKeys.length > 0) {
        const firstJoinedActivityKey = joinedActivityKeys[0]
        const activityId =
          item.joinedActivities[firstJoinedActivityKey].activityId
        await updateActivityStatus(userId, activityId, 'REJECTED')
        router.push('/admin/pending')
      } else {
        throw new Error('No joined activities found')
      }
    } catch (error) {
      errorMessage.value = `${error}`
      console.log(error)
    }
  }

  onMounted(async () => {
    await authorizedUser()
    await getNotification()
    await getAllActivityStatus()
    await getStudents()
  })

  definePageMeta({
    layout: 'admin'
  })
</script>
