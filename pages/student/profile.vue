f
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
      <div
        class="bg-red-400 py-3 pr-4 flex items-center text-xl text-center w-full h-10"
      >
        <p class="pl-24">Greetings, {{ profile.name }}</p>
      </div>
    </div>

    <div class="w-full h-full bg-white flex items-center justify-center">
      <div class="bg-yellow w-[40rem] h-[15rem] p-7 rounded-md relative">
        <p>Student</p>
        <div class="flex flex-row items-center justify-between pt-3 px-10">
          <div class="">
            <VIcon
              v-if="!profile.avatar"
              :alt="'ces-user'"
              :icon="'ces-user'"
              class="text-[6rem]"
            />
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              alt="Avatar"
              class="h-24 w-24"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              @change="handleAvatarChange"
            />
          </div>
          <div class="flex flex-col pr-20">
            <p>{{ profile.name }}</p>
            <p>Year</p>
            <p>Course</p>
            <p>{{ profile.email }}</p>
          </div>
        </div>
        <p class="pt-6 absolute right-10 bottom-5">{{ profile.id }}</p>
      </div>
    </div>
    <p>{{ userData }}</p>
  </div>
</template>

<script setup>
  const {
    authorizedUser,
    logout,
    getProfile,
    profile,
    getUserUID,
    updateUserAvatar
  } = useFirebaseAuth()
  const { uploadAvatar } = useFirestorage()

  const userData = ref('')
  const pageTitle = ref('Profile')
  const isOpen = ref(false)
  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0]
    const userId = getUserUID()
    if (userId && file) {
      const downloadURL = await uploadAvatar(userId, file)
      await updateUserAvatar(userId, downloadURL)
      await getProfile()
    }
  }

  const logUserOut = async () => {
    await logout()
    navigateTo('/')
  }

  onMounted(async () => {
    await authorizedUser()
    await getProfile()
  })

  definePageMeta({
    layout: 'member'
  })
</script>
