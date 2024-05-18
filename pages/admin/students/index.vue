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

    <div class="grow flex flex-col items-center w-full">
      <div
        class="bg-light-blue py-3 px-4 flex items-start justify-between text-xl text-center w-full text-nowrap"
      >
        <p
          class="w-36 rounded-xl ml-[100px] bg-light-blue text-cream hover:bg-dark-blue"
        >
          ID NUMBER
        </p>
        <p
          class="w-36 rounded-xl mx-3 bg-light-blue text-cream hover:bg-dark-blue"
        >
          STUDENT NAME
        </p>
        <p
          class="w-36 rounded-xl mr-[100px] bg-light-blue text-cream hover:bg-dark-blue"
        >
          COURSE & YEAR
        </p>
      </div>
      <div class="flex flex-col items-center w-full">
        <div class="flex items-center justify-center w-full">
          <input
            v-model="search"
            type="text"
            class="w-full mx-2 my-1"
            placeholder="search student"
          />
        </div>
        <div class="p-2 flex flex-col items-start text-sm text-center w-full">
          <div
            class="flex flex-col w-full items-start overflow-y-scroll overflow-x-hidden bg-cream"
          >
            <button
              v-for="(student, index) in filteredStudent"
              :key="index"
              class="flex flex-row w-full items-center text-nowrap rounded-xl mx-3 hover:bg-dark-blue hover:text-cream"
              @click="redirection(student.id)"
            >
              <div class="grow flex flex-col items-center w-24">
                <p>
                  {{ student.id }}
                </p>
              </div>
              <div class="grow flex flex-col items-center w-24">
                <p>
                  {{ student.name }}
                </p>
              </div>
              <div class="grow flex flex-col items-center w-24">
                <p v-if="student.course && student.yearLevel">
                  {{ student.course }} - {{ student.yearLevel }}
                </p>

                <p v-else>-</p>
              </div>
            </button>
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
    getStudents,
    students,
    getNotification,
    updateNotification,
    notification,
    unreadNotification
  } = useFirebaseAuth()

  const pageTitle = ref('Student')
  const date = ref(new Date())
  const isOpen = ref(false)
  const search = ref('')
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const filteredStudent = computed(() => {
    return students.value.filter((student) => {
      return (
        student.name.toLowerCase().includes(search.value.toLowerCase()) ||
        student.id.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })

  const router = useRouter()

  const redirection = async (studentId) => {
    try {
      router.push(`/admin/students/id/${studentId}`)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/admin/login')
  }

  onMounted(async () => {
    await authorizedUser()
    await getNotification()
    await getStudents()
    console.log('test', students.value)
  })

  definePageMeta({
    layout: 'admin'
  })
</script>
