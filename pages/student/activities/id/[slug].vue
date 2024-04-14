<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-dark-blue border-b border-l border-light-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon :alt="'ces-book'" :icon="'ces-book'" size="large" />
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

    <div class="grow flex flex-col">
      <div class="flex flex-row items-center">
        <div
          class="bg-red-400 py-3 px-4 flex items-start text-xl text-center w-full"
        >
          <p>{{ specificActivity.name }}</p>
        </div>
        <button
          v-if="
            specificActivity.status !== 'completed' &&
            specificActivity.status !== 'pending' &&
            specificActivity.status !== 'cancelled'
          "
          class="rounded-full bg-green h-12 w-56 px-3 mr-3"
          @click="emit('join')"
        >
          JOIN ACTIVITY
        </button>
        <div
          v-if="
            specificActivity.status === 'completed' ||
            specificActivity.status === 'pending'
          "
          class="flex flex-row ml-7 justify-between items-center"
        >
          <VIcon
            :alt="'ces-image'"
            :icon="'ces-image'"
            size="x-large"
            class="mr-3"
          />

          <VIcon
            :alt="'ces-file-text2'"
            :icon="'ces-file-text2'"
            size="x-large"
            class="mr-3"
          />

          <VIcon
            :alt="'ces-checkmark'"
            :icon="'ces-checkmark'"
            size="x-large"
            class="mr-3"
          />
        </div>
      </div>

      <div class="bg-blue-200 w-full h-40 p-3 overflow-x-auto bg-green">
        <p class="py-5">Description</p>
        <p class="pl-5">{{ specificActivity.description }}</p>
      </div>

      <div class="bg-blue-200 w-full h-24 p-3">
        <p class="pb-5">When</p>
        <p class="pl-5">
          {{
            specificActivity?.when ? timeConverter(specificActivity.when) : ''
          }}
        </p>
      </div>

      <div class="bg-blue-200 w-full h-24 p-3">
        <p class="pb-5">What</p>
        <p class="pl-5">{{ specificActivity.what }}</p>
      </div>

      <div class="bg-blue-200 w-full h-24 p-3">
        <p class="pb-5">Where</p>
        <p class="pl-5">{{ specificActivity.where }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const {
    authorizedUser,
    logout,
    specificActivity,
    getActivityById,
    getNotification,
    unreadNotification
  } = useFirebaseAuth()
  const { timeConverter } = useTools()

  const pageTitle = ref('CES ACTIVITY')
  const isOpen = ref(false)
  const route = useRoute()
  const routerID = route.params.slug

  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/')
  }

  onMounted(async () => {
    await authorizedUser()
    await getActivityById(routerID)
    await getNotification()
  })

  definePageMeta({
    layout: 'member'
  })
</script>
