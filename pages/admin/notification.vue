f
<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-dark-blue border-b border-l border-light-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon :alt="'ces-bell'" :icon="'ces-bell'" size="large" />
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
              class="absolute top-[30px] right-[70px] rounded-full h-5 w-5 flex items-center justify-center text-sm"
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

    <div class="flex flex-row">
      <div
        class="py-3 pr-4 flex items-start text-xl text-center w-full bg-light-blue text-cream"
      >
        <p class="pl-24">FREQUENTLY ASKED</p>
      </div>
    </div>

    <div class="w-full h-full bg-cream flex flex-col">
      <div class="flex flex-col p-5 text-sm relative">
        <p>1. LOREM IPSUM</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta
          lorem vitae ipsum finibus sodales. Suspendisse vitae quam id leo
          pellentesque faucibus interdum a neque. Nam lobortis, nulla ut
          consequat aliquet, lorem justo accumsan dui, non maximus ex erat at
          nibh. Vivamus nec nisi arcu.
        </p>
        <p>2. LOREM IPSUM</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta
          lorem vitae ipsum finibus sodales. Suspendisse vitae quam id leo
          pellentesque faucibus interdum a neque. Nam lobortis, nulla ut
          consequat aliquet, lorem justo accumsan dui, non maximus ex erat at
          nibh. Vivamus nec nisi arcu.
        </p>
        <p>3. LOREM IPSUM</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta
          lorem vitae ipsum finibus sodales. Suspendisse vitae quam id leo
          pellentesque faucibus interdum a neque. Nam lobortis, nulla ut
          consequat aliquet, lorem justo accumsan dui, non maximus ex erat at
          nibh. Vivamus nec nisi arcu.
        </p>
      </div>
      <button class="absolute right-20 bottom-5 px-6 py-3">CHAT</button>
    </div>
  </div>
</template>

<script setup>
  const { authorizedUser, logout, getNotification, unreadNotification } =
    useFirebaseAuth()
  const { read } = useFirestore()

  const readContent = ref([])
  const pageTitle = ref('Notifications')

  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/')
  }

  const fetchContent = async () => {
    if (!authorizedUser()) {
      throw new Error('Not authorized')
    }
    readContent.value = await read('pendingUsers')
  }

  onMounted(async () => {
    await authorizedUser()
    await getNotification()
    await fetchContent()
  })

  definePageMeta({
    layout: 'admin'
  })
</script>
