import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './index.css'; // Import your Tailwind CSS
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createI18n } from 'vue-i18n';
import en from './i18n/en.json';
import bn from './i18n/bn.json';
import fr from './i18n/fr.json';
import sv from './i18n/sv.json';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: 'en', // default language
  messages: {
    en,
    bn,
    fr,
    sv,
  }
});
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
app.use(i18n);


app.use(Toast, options);

// Finally, mount the app
app.mount('#app');
