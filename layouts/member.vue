<template>
  <div class="flex flex-row bg-cream min-h-screen w-full overflow-y-hidden">
    <aside
      class="flex flex-col justify-between bg-dark-blue h-screen basis-1/6 md:basis-2/12"
    >
      <div class="flex flex-col items-center border-b border-light-blue">
        <NuxtLink
          to="/student/home"
          class="my-7 text-light-green text-3xl text-bold"
        >
          <p>CMS</p>
        </NuxtLink>
      </div>

      <div
        class="flex flex-col items-start justify-center mx-auto my-auto mt-0"
      >
        <NuxtLink
          to="/student/home"
          class="my-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="text-light-green bg-light-blue"
        >
          <VIcon :alt="'ces-home'" :icon="'ces-home'" size="medium" />
          <p class="ml-2">Home</p>
        </NuxtLink>

        <NuxtLink
          to="/student/chat"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-light-blue text-light-green"
        >
          <VIcon
            :alt="'ces-chat-2'"
            :icon="'ces-chat-2'"
            size="medium"
          />
          <p class="ml-2">Chat</p>
        </NuxtLink>

        <NuxtLink
          to="/student/calendar"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-light-blue text-light-green"
        >
          <VIcon :alt="'ces-calendar'" :icon="'ces-calendar'" size="medium" />
          <p class="ml-2">Calendar</p>
        </NuxtLink>

        <NuxtLink
          to="/student/activities"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-light-blue text-light-green"
        >
          <VIcon :alt="'ces-book'" :icon="'ces-book'" size="medium" />
          <p class="ml-2">Activities</p>
        </NuxtLink>

        <NuxtLink
          to="/student/tracker"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-light-blue text-light-green"
        >
          <VIcon :alt="'ces-power'" :icon="'ces-power'" size="medium" />
          <p class="ml-2">Tracker</p>
        </NuxtLink>

        <NuxtLink
          to="/student/available"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-light-blue text-light-green"
        >
          <VIcon
            :alt="'ces-checkbox-checked'"
            :icon="'ces-checkbox-checked'"
            size="medium"
          />
          <p class="ml-2">Available</p>
        </NuxtLink>

      </div>
    </aside>

    <main class="flex-col bg-cream border-b border-light-blue w-full h-screen">
      <NuxtPage />
    </main>
  </div>
</template>
