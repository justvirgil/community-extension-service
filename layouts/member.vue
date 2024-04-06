<template>
  <div class="flex flex-row bg-yellow-200 min-h-screen w-full">

    <aside class="flex flex-col justify-between bg-red-300 h-screen basis-1/6 md:basis-2/12">
      <div class="flex flex-col items-center border-2 border-black">
        <NuxtLink to="/student/home" class="my-9">CMS</NuxtLink>
      </div>

      <div class="flex flex-col items-start mx-auto my-auto mt-0">

        <NuxtLink to="/student/home" class="my-8 flex flex-row items-center">
         <VIcon
            :alt="'ces-home'"
            :icon="'ces-home'"
            size="medium"
          />
          <p class="ml-2">Home</p>
        </NuxtLink>

        <NuxtLink to="/student/calendar" class="mb-8 flex flex-row items-center">
         <VIcon
            :alt="'ces-calendar'"
            :icon="'ces-calendar'"
            size="medium"
          />
          <p class="ml-2">Calendar</p>
        </NuxtLink>

        <NuxtLink to="/student/activities" class="mb-8 flex flex-row items-center">
         <VIcon
            :alt="'ces-book'"
            :icon="'ces-book'"
            size="medium"
          />
          <p class="ml-2">Activities</p>
        </NuxtLink>

        <NuxtLink to="/student/tracker" class="mb-8 flex flex-row items-center">
         <VIcon
            :alt="'ces-power'"
            :icon="'ces-power'"
            size="medium"
          />
          <p class="ml-2">Tracker</p>
        </NuxtLink>

        <NuxtLink to="/student/available" class="mb-8 flex flex-row items-center">
         <VIcon
            :alt="'ces-checkbox-checked'"
            :icon="'ces-checkbox-checked'"
            size="medium"
          />
          <p class="ml-2">Available</p>
        </NuxtLink>

      </div>
    </aside>

    <main class="flex-col bg-white border-2 border-blue-700 w-full h-screen">
      <NuxtPage />
    </main>

  </div>
</template>
