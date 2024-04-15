<template>
  <div class="flex flex-row bg-cream min-h-screen w-full">
    <aside
      class="flex flex-col justify-between bg-light-blue h-screen basis-1/6 md:basis-2/12"
    >
      <div class="flex flex-col items-center border-b border-dark-blue">
        <NuxtLink to="/admin/home" class="my-7 text-cream text-3xl text-bold">
          <p>CMS</p>
        </NuxtLink>
      </div>

      <div
        class="flex flex-col items-start justify-center mx-auto my-auto mt-0"
      >
        <NuxtLink
          to="/admin/home"
          class="my-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="text-red-500 bg-dark-blue"
        >
          <VIcon :alt="'ces-home'" :icon="'ces-home'" size="medium" />
          <p class="ml-2">Home</p>
        </NuxtLink>

        <NuxtLink
          to="/admin/calendar"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-dark-blue text-red-500"
        >
          <VIcon :alt="'ces-calendar'" :icon="'ces-calendar'" size="medium" />
          <p class="ml-2">Calendar</p>
        </NuxtLink>

        <NuxtLink
          to="/admin/activities"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-dark-blue text-red-500"
        >
          <VIcon :alt="'ces-book'" :icon="'ces-book'" size="medium" />
          <p class="ml-2">Activities</p>
        </NuxtLink>

        <NuxtLink
          to="/admin/students"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-dark-blue text-red-500"
        >
          <VIcon :alt="'ces-student'" :icon="'ces-student'" size="medium" />
          <p class="ml-2">Students</p>
        </NuxtLink>

        <NuxtLink
          to="/admin/pending"
          class="mb-8 flex flex-row items-center justify-start text-cream rounded-full w-28 h-8 pl-3"
          active-class="bg-dark-blue text-red-500"
        >
          <VIcon :alt="'ces-pending'" :icon="'ces-pending'" size="medium" />
          <p class="ml-2">Pending</p>
        </NuxtLink>
      </div>
    </aside>

    <main class="flex-col bg-cream border-b border-light-blue w-full h-screen">
      <NuxtPage />
    </main>
  </div>
</template>
