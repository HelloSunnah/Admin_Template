import { createRouter, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";
import Dashboard from "@/views/Dashboard.vue";

import Login from "@/components/Authentication/Login.vue";


// Utility function to check if the user is authenticated
function isAuthenticated() {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("token_expiry");
  const currentTime = new Date().getTime();

  if (!token || !tokenExpiry || currentTime > parseInt(tokenExpiry, 10)) {
    return false;
  }
  return true;
}

// Utility function to handle unauthorized access
function handleUnauthorizedAccess(to, next, toast) {
  console.log("User is not authenticated or token has expired. Redirecting to Login.");
  toast.error("Your session has expired. Please log in again.");
  next({ path: "/", query: { redirect: to.fullPath } });
}

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
 
  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const toast = useToast();

  if (to.meta.requiresAuth) {
    if (!isAuthenticated()) {
      handleUnauthorizedAccess(to, next, toast);
    } else {
      console.log("User is authenticated. Allowing access to:", to.name);
      next();
    }
  } else {
    next();
  }
});

export default router;
