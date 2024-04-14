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
          <NuxtLink to="/student/notification" class="mx-3 text-xl">
            <VIcon :alt="'ces-bell'" :icon="'ces-bell'" size="medium" />
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
    <div class="flex flex-row">
      <div class="grow flex flex-col items-center">
        <div class="bg-red-400 p-3 text-xl text-center w-full">
          <p>DATE</p>
        </div>
        <div class="pt-12 py-auto w-[600px]">
          <Calendar
            :is-dark="true"
            :attributes="attributes"
            expanded
            multiple
          />
        </div>
      </div>

      <div class="grow">
        <div class="bg-blue-400 p-3 text-xl text-center">
          <p>AVAILABLE</p>
        </div>
        <div class="text-center pt-12">
          <p v-for="(date, index) in activity" :key="index" class="my-3">
            {{ date.name }}, {{ timeConverter(date.when) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { DatePicker, Calendar } from 'v-calendar'
  import 'v-calendar/style.css'

  const { authorizedUser, logout, activity, getUserAllActivities } =
    useFirebaseAuth()
  const { read } = useFirestore()
  const { timestampToDate, timeConverter } = useTools()
  const timestamps = ref([])

  const attributes = ref([
    {
      highlight: {
        color: 'red',
        fillMode: 'solid'
      },
      dates: timestamps
    }
  ])

  const calendarColor = ref(true)
  const pageTitle = ref('Calendar')
  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/')
  }

  onMounted(async () => {
    await authorizedUser()
    await getUserAllActivities()
    timestamps.value = timestampToDate(activity.value.map((item) => item.when))
  })

  definePageMeta({
    layout: 'member'
  })
</script>
