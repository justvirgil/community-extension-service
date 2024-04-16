<template>
  <div class="flex flex-col h-full w-full bg-cream">
    <header
      class="flex flex-row bg-light-blue border-b border-l border-dark-blue"
    >
      <nav class="flex flex-row my-8 grow">
        <div class="flex flex-row items-center grow ml-16 text-white">
          <VIcon :alt="'ces-book'" :icon="'ces-book'" size="large" />
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
    <div class="flex flex-col items-center">
      <div class="bg-dark-blue text-cream text-center text-2xl w-full p-3">
        <p class="pl-5">{{ tabName }}</p>
      </div>
    </div>
    <div class="flex items-center justify-center mt-10">
      <div
        class="mt-2 rounded-xl h-full p-10 w-[60rem] flex items-center justify-center bg-dark-blue"
      >
        <form
          class="flex flex-row items-center justify-center"
          @submit.prevent="createActivity"
        >
          <div>
            <div class="flex items-center justify-center">
              <p
                v-if="errorMessage"
                class="text-red-500 text-xs text-center font-bold"
              >
                {{ errorMessage }}
              </p>
            </div>
            <VTextField
              v-model="title"
              type="text"
              placeholder="CES TITLE"
              class="w-[25rem] h-8 text-black m-2"
            />
            <VTextField
              v-model="description"
              type="text"
              placeholder="CES DESCRIPTION"
              class="w-[25rem] h-24 rounded-xl text-black m-2"
            />
            <VTextField
              v-model="where"
              type="text"
              placeholder="CES WHERE"
              class="w-[25rem] h-8 text-black m-2"
            />
            <VTextField
              v-model="what"
              type="text"
              placeholder="CES WHAT"
              class="w-[25rem] h-8 text-black m-2"
            />
            <div
              class="flex flex-row items-center w-[25rem] h-8 text-black m-2"
            >
              <label class="text-cream pl-3">CES WHEN:</label>
              <input
                v-model="when"
                type="datetime-local"
                name="when"
                placeholder="CES WHEN"
                class="ml-3 rounded-xl"
              />
            </div>
          </div>
          <div class="ml-3 mt-10">
            <div class="flex flex-row p-5">
              <div class="mr-2">
                <label for="yearLevel" class="text-cream mr-2"
                  >Year Level:
                </label>
                <select id="yearLevel" v-model="yearLevel" name="yearLevel">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <label for="status" class="text-cream mr-2">Status: </label>
              <select id="status" v-model="status" name="status">
                <option value="Pending">Pending</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div class="flex flex-col items-center justity-between my-5">
              <div class="flex flex-col bg-cream w-80 h-32 rounded-xl mb-5">
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  @change.prevent="handleFileSubmit($event)"
                />
                <button
                  type="button"
                  class="w-full h-full bg-gray-500 rounded-xl"
                  @click="$refs.fileInput.click()"
                >
                  <p class="text-cream">CES PARENTAL FORMS</p>
                  <VIcon
                    class="text-cream w-full h-full"
                    :alt="'ces-file-text'"
                    :icon="'ces-file-text'"
                    size="x-large"
                  />
                </button>
              </div>
              <div class="flex flex-row justify-end mr-8 mt-2 mb-2">
                <VButton
                  class="w-24 mr-10"
                  :is-bold="true"
                  :is-rounded="true"
                  type="submit"
                >
                  ADD
                </VButton>
                <NuxtLink
                  to="/admin/activities/"
                  class="bg-red-400 mx-1 flex items-center justify-center rounded-full h-10 w-10"
                >
                  <VIcon
                    :alt="'ces-cross'"
                    :icon="'ces-cross'"
                    size="medium"
                    class="text-cream flex items-center justify-center"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  const {
    authorizedUser,
    logout,
    userUID,
    activity,
    getNotification,
    unreadNotification,
    getUserUID,
    addActivity
  } = useFirebaseAuth()
  const { generateUUID } = useTools()
  const { uploadFiles } = useFirestorage()

  const title = ref('')
  const description = ref('')
  const where = ref('')
  const what = ref('')
  const when = ref('')
  const yearLevel = ref(1)
  const status = ref('Upcoming')

  const errorMessage = ref('')
  const readContent = ref([])
  const tabName = ref('ADD ACTIVITY')
  const pageTitle = ref('Activities')
  const isOpen = ref(false)

  const toggleDropDown = () => {
    isOpen.value = !isOpen.value
  }

  const activityID = generateUUID()
  const userId = getUserUID()

  const handleFileSubmit = async (event) => {
    try {
      const file = event.target.files[0]
      if (file) {
        await uploadFiles(userId, activityID, file)
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const createActivity = async () => {
    try {
      if (
        !title.value ||
        !description.value ||
        !where.value ||
        !when.value ||
        !what.value ||
        !yearLevel.value ||
        !status.value
      ) {
        errorMessage.value = 'Please fill in all the required fields.'
      } else {
        await addActivity(activityID, {
          name: title.value,
          description: description.value,
          where: where.value,
          when: new Date(when.value),
          what: what.value,
          yearLevel: yearLevel.value,
          createdAt: new Date(),
          status: status.value
        })
        errorMessage.value = ''
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
    await getNotification()
  })

  definePageMeta({
    layout: 'admin'
  })
</script>
