import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './index.css'; // Import your Tailwind CSS
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

// Set up Toastification options
const options = {
  position: POSITION.TOP_CENTER, // Change to TOP_CENTER or BOTTOM_CENTER as per your need
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
};

// Use Toastification with the app instance

app.use(router);
app.use(Toast, options);

// Finally, mount the app
app.mount('#app');
