<template>
  <div class="flex flex-row items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center">
      <p class="bg-green-300 font-bold text-9xl text-green">CMS</p>
      <p class="bg-green-300 text-5xl text-dark-blue">STUDENT</p>
    </div>
    <div
      v-if="showAdminForm"
      class="bg-dark-blue/90 rounded-lg m-60 w-96 h-96 flex flex-col items-center justify-center"
    >
      <form
        class="flex flex-col items-center justify-center"
        @submit.prevent="goAdminPage"
      >
        <div class="h-5">
          <p class="text-red-500 text-xs font-bold">{{ errorKeyMessage }}</p>
        </div>
        <VTextField
          v-model="configKey"
          type="text"
          placeholder="enter secret key"
          class="w-60 h-12 text-black m-2"
        />
        <VButton
          class="bg-red-500 w-24 mt-8 hover:bg-red-400"
          :is-bold="true"
          :is-rounded="true"
          type="submit"
        >
          SUBMIT
        </VButton>
      </form>
      <VButton
        class="w-24 mt-14 text-xs rounded-lg"
        :is-bold="true"
        type="submit"
        @click="switchAdmin"
      >
        Go Back
      </VButton>
    </div>
    <div
      v-if="!showAdminForm"
      class="bg-dark-blue/90 rounded-lg m-60 w-96 h-96 flex flex-col items-center justify-center"
    >
      <form class="flex flex-col items-center" @submit.prevent="userLogin">
        <div class="h-5">
          <p v-if="errorMessage" class="text-red-500 text-xs font-bold">
            {{ errorMessage }}
          </p>
          <p v-else-if="authError" class="text-red-500 text-xs font-bold">
            {{ authError }}
          </p>
        </div>
        <VTextField
          v-model="email"
          type="email"
          placeholder="email"
          class="w-60 h-12 text-black m-2"
        />
        <VTextField
          v-model="password"
          type="password"
          placeholder="password"
          class="w-60 h-12 text-black m-2"
        />
        <VButton
          class="w-24 mt-3"
          :is-bold="true"
          :is-rounded="true"
          type="submit"
        >
          LOG IN
        </VButton>
      </form>
      <div class="flex flex-row mt-10">
        <google-button />
        <NuxtLink to="/register" class="text-white">
          <VButton class="ml-2.5 h-10 w-full text-xs rounded-lg" :is-bold="true"
            >REGISTER</VButton
          >
        </NuxtLink>
      </div>
      <VButton
        class="w-24 bg-red-500 hover:bg-red-400 mt-5 text-xs rounded-lg"
        :is-bold="true"
        type="submit"
        @click="switchAdmin"
      >
        OVERRIDE
      </VButton>
    </div>
  </div>
</template>

<script setup>
  const email = ref('')
  const password = ref('')
  const configKey = ref('')
  const showAdminForm = ref(false)
  const errorMessage = ref('')
  const errorKeyMessage = ref('')
  const switchLabel = ref('login as admin')

  const { loginUser, errorMessage: authError } = useFirebaseAuth()

  const { $secretAdminKey } = useNuxtApp()

  const emailRegex = /^[\w\-\+\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const userLogin = async () => {
    try {
      if (email.value === '' || password.value === '') {
        errorMessage.value = 'Invalid email or password'
      } else if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Please enter a valid email address!'
      } else {
        await loginUser(email.value, password.value)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const switchAdmin = () => {
    showAdminForm.value = !showAdminForm.value
    switchLabel.value = showAdminForm.value
      ? 'login as student'
      : 'login as admin'
  }

  const goAdminPage = () => {
    if (configKey.value === $secretAdminKey) {
      navigateTo('/admin/login')
    } else {
      errorKeyMessage.value = 'Invalid Secret Key'
    }
  }

  console.log('secret admin key', $secretAdminKey)

  definePageMeta({
    layout: 'guest'
  })
</script>
