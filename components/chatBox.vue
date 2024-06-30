<template>
  <section class="flex bg-light-blue text-cream overflow-auto h-full w-full">
    <div class="flex flex-col items-center justify-start h-full bg-dark-blue w-56 p-2 m-1">
      <div class="mb-3">
        Chat groups
      </div>
      <div v-for="(activity, index) in chatGroups" :key="index" class="mb-1">
        <button @click="test(activity.activityId)">
          {{ activity.name }}
        </button>
      </div>
    </div>
    <div class="flex flex-col bg-dark-blue w-full">
      <div v-for="(item, index) in chatMessage" :key="index">
        <message
          :username="item.senderId"
          :is-sender="item.senderId === userUID ? true : false"
        >
          {{ item.message }}
        </message>
      </div>
        <div class="flex items-end justify-center h-full w-full">
          <VTextField
            v-model="messages"
            type="text"
            placeholder="Enter a message"
            class="w-full p-2 m-3 text-black"
          />
          <button @click="sendMessage()">test</button>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getMessages, message: chatMessage, userUID, getMyAcceptedActivities, profileActivity: chatGroups, addMessage } = useFirebaseAuth()
const username = ref('user1')
const messages = ref('')
const mockId = ref('00KgsASWHmzZqTMnXi72')

const test = async (id) => {
  mockId.value = id
  await getMessages(id)
  // console.log('hey',chatGroups.value[0].activityId)
  console.log('hey',mockId.value)
}

console.log('hey',mockId.value)

const sendMessage = async () => {
  try {
    await addMessage(mockId.value, {
      senderId: userUID.value,
      message: messages.value,
      timestamp: new Date()
    })
    console.log('eh')
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getMyAcceptedActivities()
  await getMessages(chatGroups.value[0].activityId)
  console.log('test23', chatGroups.value)
  console.log("message from chatGroups in component", chatMessage.value)
})
</script>
