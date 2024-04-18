<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div
      class="bg-dark-blue/90 rounded-lg w-[600px] h-[700px] flex flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center mb-6">
        <p class="text-6xl text-green font-bold mb-2">CMS</p>
        <p class="text-xl text-white font-bold">STUDENT REGISTER</p>
      </div>
      <div>
        <form
          class="flex flex-col items-center justify-center"
          @submit.prevent="handleSubmit"
        >
          <div class="h-5">
            <p v-if="errorMessage" class="text-red-500 text-xs font-bold">
              {{ errorMessage }}
            </p>
            <p v-else-if="authError" class="text-red-500 text-xs font-bold">
              {{ authError }}
            </p>
          </div>
          <VTextField
            v-model="firstName"
            type="text"
            placeholder="first name"
            class="w-80 h-12 text-black m-2"
          />
          <VTextField
            v-model="lastName"
            type="text"
            placeholder="last name"
            class="w-80 h-12 text-black m-2"
          />
          <div class="flex flex-col my-2">
            <div class="mb-2 flex-row w-56">
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
            <div class="flex flex-row">
              <label for="course" class="text-cream mr-2">Course: </label>
              <select id="course" v-model="course" name="course" class="w-60">
                <option value="Information and Communication Technologies">
                  Information and Communication Technologies
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Information System">Information System</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
          </div>
          <VTextField
            v-model="email"
            type="email"
            placeholder="email"
            class="w-80 h-12 text-black m-2"
          />
          <VTextField
            v-model="password"
            type="password"
            placeholder="password"
            class="w-80 h-12 text-black m-2"
          />
          <VTextField
            v-model="confirmPassword"
            type="password"
            placeholder="confirm password"
            class="w-80 h-12 text-black m-2"
          />
          <VButton
            class="w-28 mt-6"
            :is-bold="true"
            :is-rounded="true"
            type="submit"
          >
            SIGN UP
          </VButton>
        </form>
      </div>
      <div class="flex flex-row items-center justify-between mt-10">
        <google-button />
        <NuxtLink to="/">
          <VButton class="ml-3 w-full h-10 text-xs rounded-lg">
            <p class="font-bold">ALREADY HAVE?</p>
          </VButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const yearLevel = ref(1)
  const course = ref('')
  const confirmPassword = ref('')
  const errorMessage = ref('')

  const { register, errorMessage: authError } = useFirebaseAuth()
  const { readById } = useFirestore()

  const checkEmail = async () => {
    const users = await readById('admins', email.value)
    const admins = await readById('users', email.value)

    return { users, admins }
  }

  const emailRegex = /^[\w.+-]+@([\w-]+\.)+[\w-]{2,4}$/

  const handleSubmit = async () => {
    try {
      if (
        firstName.value === '' ||
        lastName.value === '' ||
        email.value === '' ||
        yearLevel.value === '' ||
        course.value === '' ||
        password.value === '' ||
        confirmPassword.value === ''
      ) {
        errorMessage.value = 'Please fill empty field!'
      } else if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Please enter a valid email address!'
      } else if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Password do not match!'
      } else {
        const existingEmail = await checkEmail()

        if (existingEmail.users.length > 0 || existingEmail.admins.length > 0) {
          errorMessage.value = 'Email already exist!'
        } else {
          await register(email.value, password.value, {
            isAdmin: false,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            course: course.value,
            yearLevel: yearLevel.value,
            createdAt: new Date()
          })
          navigateTo('/')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  definePageMeta({
    layout: 'guest'
  })
</script>
