// src/config/globals.js
import apiEndpoints from '@/config/apiConfig';
import PrescriptionModal from '@/components/Modals/PrescriptionModal.vue';
import axios from 'axios';
import { handleAuthError } from "@/utlis/ErrorHandler.js";
import { useToast } from "vue-toastification";
const globals = {
  apiEndpoints,
  PrescriptionModal,
  axios,
  handleAuthError,
};

export { globals };
