<template>
  <div class="header bg-[rgb(81,150,160)] text-white py-2 px-4 rounded-md shadow-lg">
    <h6 class="flex items-center p-1 text-sm md:text-base">
      <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" class="mr-2 w-5 h-5">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M15.5 5H11l5 7-5 7h4.5l5-7z"></path>
        <path d="M8.5 5H4l5 7-5 7h4.5l5-7z"></path>
      </svg>
      Dashboard
    </h6>
  </div>


</template>
<script>
import DashboardLogic from "@/components/js/Dashboard.js";

export default {
  name: "DashboardLogic",
  components: {},
  ...DashboardLogic,
}
</script>
