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

    <div class="grow flex flex-col bg-dark-blue">
      <div class="flex flex-row items-center bg-light-blue">
        <div class="py-3 px-4 flex items-start text-xl text-center w-full">
          <p class="text-cream">{{ specificActivity.name }}</p>
        </div>
        <div class="flex flex-row ml-7 justify-center items-center">
          <input
            ref="imageInput"
            type="file"
            class="hidden"
            @change="handleFileSubmit($event)"
          />
          <button @click="$refs.imageInput.click()">
            <VIcon
              :alt="'ces-image'"
              :icon="'ces-image'"
              size="medium"
              class="mr-3 text-cream"
            />
          </button>

          <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileSubmit($event)"
          />
          <button @click="$refs.fileInput.click()">
            <VIcon
              :alt="'ces-file-text'"
              :icon="'ces-file-text'"
              size="medium"
              class="mr-3 text-cream"
            />
          </button>
        </div>
        <NuxtLink to="/student/activities/" class="mx-3 text-xl text-white">
          <VIcon
            :alt="'ces-cross'"
            :icon="'ces-cross'"
            size="medium"
            class="text-red-600"
          />
        </NuxtLink>
      </div>

      <div class="bg-dark-blue text-cream">
        <div class="w-full h-40 p-3 overflow-x-auto">
          <p class="py-5 text-xl">Description</p>
          <p class="pl-5 text-l">{{ specificActivity.description }}</p>
        </div>

        <div class="w-full h-24 p-3">
          <p class="pb-5 text-xl">When</p>
          <p class="pl-5 text-l">
            {{
              specificActivity?.when ? timeConverter(specificActivity.when) : ''
            }}
          </p>
        </div>

        <div class="w-full h-24 p-3">
          <p class="pb-5 text-xl">What</p>
          <p class="pl-5 text-l">{{ specificActivity.what }}</p>
        </div>
        <div class="w-full h-24 p-3">
          <p class="pb-5 text-xl">Where</p>
          <p class="pl-5 text-l">{{ specificActivity.where }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const {
    authorizedUser,
    logout,
    getActivityById,
    joinActivity,
    specificActivity,
    getNotification,
    unreadNotification,
    getUserUID
  } = useFirebaseAuth()
  const { timeConverter } = useTools()
  const { uploadFiles } = useFirestorage()

  const pageTitle = ref('CES ACTIVITY')
  const isOpen = ref(false)
  const route = useRoute()
  const routerID = route.params.slug
  const errorMessage = ref('')

  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const userId = getUserUID()

  const handleFileSubmit = async (event) => {
    try {
      const file = event.target.files[0]

      if (file) {
        await uploadFiles(userId, routerID, file)
      }
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
    await getActivityById(routerID)
    await getNotification()
  })

  definePageMeta({
    layout: 'member'
  })
</script>
