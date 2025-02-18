import apiEndpoints from "@/config/apiConfig";

export default {
  data() {
    return {
      totalPaidAmount: 0,
      totalPendingAmount: 0,
      totalRequests: 0,
      totalPendingRequests: 0,
      totalPrescriptionId:0,
    };
  },
  methods: {
    async fetchPaidData() {
      try {
        const response = await fetch(apiEndpoints.PaidDueList);
        const data = await response.json();
        if (data && data.dueList) {
          this.totalPaidAmount = data.dueList.reduce((sum, item) => sum + item.amount, 0);
        }
      } catch (error) {
        console.error("Error fetching paid data:", error);
      }
    },
    async fetchDueData() {
      try {
        const response = await fetch(apiEndpoints.DueList);
        const data = await response.json();
        if (data && data.dueList) {
          this.totalPendingAmount = data.dueList.reduce((sum, item) => sum + item.amount, 0);
        }
      } catch (error) {
        console.error("Error fetching due data:", error);
      }
    },
    async fetchRequestData() {
      try {
        const response = await fetch(apiEndpoints.dashboard_request);
        const data = await response.json();
        if (data && data.requests) {
          this.totalRequests = data.requests.length;
        }
        if (data && data.totalPrescription && data.totalPrescription._count) {
          this.totalPrescriptionId = data.totalPrescription._count.id;  // Extract the id
          console.log(" fetching request data:", this.totalPrescriptionId);

        }
      } catch (error) {
        console.error("Error fetching request data:", error);
      }
    }},
  created() {
    this.fetchPaidData();
    this.fetchDueData();
    this.fetchRequestData();
  },
};
