
import { globals } from "@/config/globals";
import { useToast } from "vue-toastification";

export default {
  name: "Login",

  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      loading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async loginUser() {
      this.loading = true;
      try {
        const response = await globals.axios.post(
          globals.apiEndpoints.login,
          this.form
        );
      
        if (response.data && response.data.token) {
          const token = response.data.token;
          const expiresIn = 3600;
          const expirationTime = new Date().getTime() + expiresIn * 1000; // Set expiry time
                localStorage.setItem("token", token);
          localStorage.setItem("token_expiry", expirationTime);
      
          console.log("Login successful", response.data);
      
          this.$router.push("/dashboard");
          this.toast.success("Login successful!");
        } else {
          this.toast.error("Invalid username or password");
        }
      } catch (error) {
        console.error("Login failed", error.response ? error.response.data : error.message);
        this.toast.error("Login failed: " + (error.response ? error.response.data.message : error.message));
      } finally {
        this.loading = false;
      }
       
    },
  },
};