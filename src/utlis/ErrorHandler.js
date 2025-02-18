import { useToast } from "vue-toastification";

export const handleAuthError = (error) => {
  const toast = useToast();

  if (error.response && error.response.status === 401) {
    localStorage.removeItem("token");
    redirectToLogin();
    toast.warning("Session expired. Please log in again.");
  } else {
    console.error("API Error:", error);
    toast.error("An error occurred while processing your request.");
  }
};

export const redirectToLogin = () => {
  localStorage.removeItem("token");
  const router = useRouter();
  router.push("/login");
  toast.warning("Unexpected data format. Please log in again.");
};
