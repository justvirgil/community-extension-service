<template>
  <div class="flex flex-row items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center">
      <p class="bg-green-300 font-bold text-9xl text-green">CMS</p>
      <p class="bg-green-300 text-5xl text-dark-blue">ADMIN</p>
    </div>
    <div
      class="bg-dark-blue/90 rounded-lg m-60 w-96 h-96 flex flex-col items-center justify-center"
    >
      <form class="flex flex-col items-center" @submit.prevent="adminLogin">
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
        <NuxtLink to="/admin/register" class="text-white">
          <VButton
            class="ml-2.5 h-10 w-full text-xs rounded-lg"
            :is-bold="true"
          >
            REGISTER
          </VButton>
        </NuxtLink>
      </div>
      <NuxtLink to="/" class="text-white">
        <VButton
          class="w-40 mt-5 bg-red-500 hover:bg-red-400 text-xs rounded-lg"
          :is-bold="true"
          type="submit"
        >
          Switch to student
        </VButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const email = ref('')
  const password = ref('')
  const configKey = ref('')
  const errorMessage = ref('')
  const switchLabel = ref('login as student')

  const { loginAdmin, errorMessage: authError } = useFirebaseAuth()

  const { $secretAdminKey } = useNuxtApp()

  const emailRegex = /^[\w\-\+\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const adminLogin = async () => {
    try {
      if (email.value === '' || password.value === '') {
        errorMessage.value = 'Invalid Input'
      } else if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Please enter a valid email address!'
      } else {
        await loginAdmin(email.value, password.value)
      }
    } catch (error) {
      console.error(error)
    }
  }

  console.log('secret admin key', $secretAdminKey)

  definePageMeta({
    layout: 'guest'
  })
</script>
