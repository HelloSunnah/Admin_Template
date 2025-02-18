<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg max-w-7xl w-full h-auto overflow-hidden relative">
      <div class="bg-[#345569] flex justify-center rounded-xl shadow-xl pt-3 pb-2 border text-white">
        <h4>Add New Prescription</h4>
      </div>
      <button @click="closeModal"
        class="absolute top-2 right-2 text-white border border-white rounded-none text-xl font-bold hover:bg-white hover:text-black focus:outline-none">
        &times;
      </button>
      <form @submit.prevent="handleSubmit" class="space-y-6 flex flex-col h-full">
        <div class="overflow-y-auto py-6 px-4 max-h-[80vh]">
          <div class="flex space-x-8">
            <div class="w-2/5 space-y-6">
              <div class="mb-4" @click="hideDropdown">
                <label for="employeeName" class="block text-gray-700 mb-2">Employee Name</label>
                <div class="relative">
                  <input type="text" required v-model="searchTerm" placeholder="Search Employee..."
                    @focus="showEmployeeDropdown = true" @input="filterEmployees" @blur="hideDropdown"
                    class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

                  <div v-if="showEmployeeDropdown"
                    class="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                    <ul>
                      <li v-for="(employee, index) in searchTerm === ''
                        ? employees
                        : filteredEmployees" :key="index" @click="selectEmployee(employee)"
                        class="cursor-pointer p-2 hover:bg-blue-100">
                        {{ employee.EFULL_NAME }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <label for="age" class="block text-gray-700 mb-2">Age </label>
                <div class="flex space-x-2">
                  <input type="number" placeholder="Day" v-model="ageDay" min="0"
                    class="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="number" min="0" placeholder="Month" v-model="ageMonth"
                    class="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="number" min="0" placeholder="Year" v-model="ageYear"
                    class="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div class="mb-4">
                <label for="prescriptionGenDate" class="block text-gray-700 mb-2">Prescription Date</label>
                <input type="date" id="prescriptionGenDate" v-model="prescriptionGenDate" :min="todayDate"
                  class="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="mb-1">
                <label for="medicineDeliveryDate" class="block text-gray-700 mb-2">Expected Received Date</label>
                <input type="date" id="medicineDeliveryDate" v-model="medicineDeliveryDate" :min="tomorrowDate"
                  class="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div class="mb-4 mt-3">
                <label for="requestFor" class="block text-gray-700 mb-2">Request For</label>
                <select v-model="requestFor"
                  class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parents">Parents</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div v-if="requestFor !== 'Self'">
                <div class="mb-4 mt-3">
                  <label for="relationReqEmp" class="block text-gray-700 mb-2">Name of Patient
                  </label>
                  <input v-model="relationReqEmp" type="text" placeholder="Enter relationReqEmp's name"
                    class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
            <div class="w-3/5 space-y-6">
              <div class="mb-4 mt-3">
                <label for="requestFor" class="block text-sm font-medium text-gray-700">Upload Prescription
                  Image</label>

                <div class="grid grid-cols-12 gap-6 mt-2 bg-[rgb(239,239,239)] p-4 rounded-md">
                  <div
                    class="col-span-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors h-[150px] rounded-md">
                    <label @click="openFileInput" class="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600 mb-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4V2m0 0h4m-4 0H8m4 2h4a2 2 0 012 2v2m-6 0v4m-4-6h-4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V10a2 2 0 00-2-2h-4m-6 6h6" />
                      </svg>
                      <span class="text-blue-600">Add an Image</span>
                    </label>
                    <input type="file" class="hidden" ref="fileInput" accept="image/*" name="presImage"
                      @change="handleFileChange" multiple :disabled="formData.presImages.length >= 4" />
                    <p v-if="formData.presImages.length >= 4"
                      class="text-sm mt-2 text-center bg-red-100 text-red-600 p-2 rounded-md shadow-md">
                      You can only upload a maximum of 4 images.
                    </p>
                  </div>
                  <div class="col-span-8 flex flex-wrap justify-start gap-4">
                    <div v-for="(image, index) in formData.presImages" :key="index" class="relative w-1/3">
                      <img :src="image.preview" class="h-[150px] w-full object-cover rounded-md" />
                      <button @click="removeImage(index)"
                        class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition duration-200 ease-in-out shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6">
                <table class="table-auto w-full">
                  <thead>
                    <tr>
                      <th class="border bg-[#345569] text-white">Medicine Name *</th>
                      <th class="border bg-[#345569] text-white">Medicine Qty *</th>
                      <th class="border bg-[#345569] text-white text-center">
                        <button type="button" :disabled="!canAddRow" @click="handleAddMedicineRow"
                          class="bg-[rgb(46,64,83)] ml-8 text-white px-4 py-2 rounded-md hover:bg-[#345569] shadow-xl flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                          <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM12 6v12m6-6H6" />
                          </svg>
                          Add
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(medicine, index) in medicines" :key="index">
                      <td class="border px-4 py-2">
                        <div class="relative">
                          <label for="medicineSearch" class="sr-only">Search Medicine</label>
                          <input type="text" v-model="medicine.medicineName" @input="handleFilterMedicines(index)"
                            placeholder="Search medicine" required @focus="showSuggestions(index)"
                            class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          <ul v-if="medicine.filteredMedicines && medicine.filteredMedicines.length > 0"
                            class="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                            <li v-for="item in medicine.filteredMedicines" :key="item.id"
                              @click="handleSelectMedicine(item, index)" class="cursor-pointer p-2 hover:bg-blue-100"
                              :class="{
                                'bg-gray-200 text-gray-400': item.disabled,
                              }" :style="item.disabled ? { pointerEvents: 'none' } : {}">
                              {{ item.brandName }}
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td class="border px-4 py-2" style="width: 20%">
                        <input v-model="medicine.medicineQty" type="number" required placeholder="Enter medicineQty"
                          class="border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0" />
                      </td>
                      <td class="border text-center" style="width: 20%">
                        <button @click="handleRemoveMedicineRow(index)" :disabled="medicines.length === 1"
                          class="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium h-6 w-6 mb-1 text-red-500"
                            focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                            data-testid="RemoveCircleOutlineIcon">
                            <path class="fill-current text-white"
                              d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center space-x-4 p-4">
          <button type="submit"
            class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
          <button @click="closeModal"
            class="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Prescription from "@/components/js/Modal/PrescriptionModal";
export default {
  name: "Prescription",
  ...Prescription,
};
</script>
<style scoped></style>
