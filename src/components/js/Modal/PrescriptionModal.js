import apiEndpoints from "@/config/apiConfig";
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      medicine: {
        medicineQty: 0,
      },
      formData: {
        medicines: [{ medicineName: "", medicineQty: "" }],
        empName: "",
        presImages: [],
      },
      employeeName: "",
      ageYear: "",
      ageMonth: "",
      ageDay: "",
      prescriptionGenDate: "",
      medicineDeliveryDate: "",
      requestFor: "Self",
      relationReqEmp: "",
      employees: "",
      filteredEmployees: [],
      todayDate: this.formatDate(new Date()),
      tomorrowDate: this.formatDate(new Date(Date.now() + 86400000)),
      employeeId: "",
      searchTerm: "",
      showEmployeeDropdown: false,
      medicines: [{ medicineName: "", medicineQty: 1, filteredMedicines: [] }],
      availableMedicines: [],
    };
  },
  computed: {
    canAddRow() {
      return this.medicines.every(
        (medicine) => medicine.medicineName.trim() && medicine.medicineQty >= 1
      );
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.prescriptionGenDate = this.todayDate;
    this.medicineDeliveryDate = this.tomorrowDate;
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  created() {
    this.fetchEmployees();
    this.fetchMedicines();
    document.addEventListener("click", this.handleClickOutside);
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async fetchMedicines() {
      try {
        const response = await axios.get(apiEndpoints.getAllMedicine);
        this.availableMedicines = response.data;
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    },
    hideDropdown() {
      setTimeout(() => {
        this.showEmployeeDropdown = false;
      }, 300); // Added a little more delay here
    },
    handleClickOutside(event) {
      // Check if the click is outside the dropdown or input field
      if (!this.$el.contains(event.target)) {
        this.showEmployeeDropdown = false;
      }
    },
    handleDropdownClick(event) {
      // Prevent the click event from propagating when clicking inside the input or dropdown
      event.stopPropagation();
    },
    showSuggestions(index) {
      this.medicines[index].filteredMedicines = this.availableMedicines;
    },
    handleFilterMedicines(index) {
      const query = this.medicines[index].medicineName.toLowerCase();
      this.medicines[index].filteredMedicines = this.availableMedicines.filter(
        (medicine) => medicine.brandName.toLowerCase().includes(query)
      );
    },
    handleSelectMedicine(medicine, index) {
      const previousMedicine = this.medicines[index].medicineName;

      if (previousMedicine) {
        this.availableMedicines = this.availableMedicines.map((item) => {
          if (item.brandName === previousMedicine) {
            item.disabled = false;
          }
          return item;
        });
      }
      const isAlreadyAdded = this.medicines.some(
        (item, idx) => idx !== index && item.medicineName === medicine.brandName
      );
      if (isAlreadyAdded) {
        this.disableMedicine(medicine);
        return;
      }

      this.medicines[index].medicineName = medicine.brandName;
      this.medicines[index].filteredMedicines = [];
      this.medicines[index].udProductCode = medicine.udProductCode;

      this.disableMedicine(medicine);
    },

    disableMedicine(medicine) {
      this.availableMedicines = this.availableMedicines.map((item) => {
        if (item.brandName === medicine.brandName) {
          item.disabled = true;
        }
        return item;
      });
    },

    handleRemoveMedicineRow(index) {
      if (this.medicines.length > 1) {
        const removedMedicine = this.medicines[index];

        this.availableMedicines = this.availableMedicines.map((item) => {
          if (item.brandName === removedMedicine.medicineName) {
            item.disabled = false;
          }
          return item;
        });

        this.medicines.splice(index, 1);
      }
    },

    handleAddMedicineRow() {
      this.medicines.unshift({
        medicineName: "",
        medicineQty: 1,
        filteredMedicines: [],
        udProductCode: "",
      });
    },

    async fetchEmployees() {
      try {
        const response = await axios.get(apiEndpoints.getAllEmployees);
        this.employees = response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    filterEmployees() {
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.EFULL_NAME.toLowerCase().includes(
          this.searchTerm.toLowerCase()
        )
      );
      this.showEmployeeDropdown = this.filteredEmployees.length > 0;
    },
    selectEmployee(employee) {
      this.searchTerm = employee.EFULL_NAME;
      this.employeeName = employee.EFULL_NAME;
      this.showEmployeeDropdown = false;
      this.employeeId = employee.EMPLOYE_ID;
    },

    handleFileChange(event) {
      const files = Array.from(event.target.files);
      if (this.formData.presImages.length + files.length > 4) {
        this.toast.error("You can only upload a maximum of 4 images.");

        return;
      }

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.presImages.push({ file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    },
    removeImage(index) {
      this.formData.presImages.splice(index, 1);
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },

    async handleSubmit() {
      try {
        const employeesResponse = await axios.get(apiEndpoints.getAllEmployees);
        const employeeExists = employeesResponse.data.some(
          (employee) => employee.EFULL_NAME === this.employeeName
        );

        if (!employeeExists) {
          this.toast.error("Employee name does not exist");
          return;
        }
        const medicinesResponse = await axios.get(apiEndpoints.getAllMedicine);
        const availableMedicines = medicinesResponse.data;
        const invalidMedicines = this.medicines.filter(
          (medicine) =>
            !availableMedicines.some(
              (availableMedicine) =>
                availableMedicine.brandName === medicine.medicineName
            )
        );
        if (invalidMedicines.length > 0) {
          this.toast.error(
            invalidMedicines.map((m) => m.medicineName).join(", ") +
              " is  not exist , Please Add a valid Medicine "
          );
          return;
        }
        const formData = new FormData();
        formData.append("empName", this.employeeName);
        formData.append("requestFor", this.requestFor);
        formData.append(
          "relationReqEmp",
          this.requestFor !== "Self" ? this.relationReqEmp : null
        );

        formData.append("ageYear", this.ageYear);
        formData.append("ageMonth", this.ageMonth);
        formData.append("ageDay", this.ageDay);
        formData.append("prescriptionGenDate", this.prescriptionGenDate);
        formData.append("medicineDeliveryDate", this.medicineDeliveryDate);
        if (this.formData.presImages.length > 0) {
          this.formData.presImages.forEach((image) => {
            formData.append("presImage[]", image.file);
          });
        } else {
          formData.append("presImage[]", null);
        }
        formData.append("medicines", JSON.stringify(this.medicines));
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const response = await axios.post(
          apiEndpoints.createPrescription,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.toast.success("Prescription Created successfully!");

        console.log("form:", formData);

        if (response.data.success) {
          this.toast.success("Prescription Created successfully!");
          this.resetForm();
          this.closeModal();
        } else {
          this.toast.error("Error creating prescription");
        }
      } catch (error) {
        console.error("Error:", error);
        this.toast.error("Error creating prescription");
      }
    },
    closeModal() {
      this.$emit("close");
      window.location.reload();
    },
    resetForm() {
      this.searchTerm = "";
      this.requestFor = "Self";
      this.relationReqEmp = "";
      this.ageDay = "";
      this.ageMonth = "";
      this.ageYear = "";
      this.prescriptionGenDate = "";
      this.medicineDeliveryDate = "";
      this.presImages = [];
      this.medicines = [
        { medicineName: "", medicineQty: "", filteredMedicines: [] },
      ];
    },
  },
};
