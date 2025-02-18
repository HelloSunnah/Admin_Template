// const ati_url_1 = "http://203.130.133.166/ATI-ERP2";
const ati_url_1 = "https://erp.atilimited.net";
const ati_url_2 = "http://gpst.billingdil.com:8088/tourplan_ws";
// const ati_url_3 = "http://192.168.0.84:5002";
const ati_url_3 = "http://192.168.0.3:5002";


const apiEndpoints = {
  dashboard_request:`${ati_url_3}/api/dahsboard/getAllTotalPendingRequest`,


  login: `${ati_url_3}/api/users/login`,
  getAllEmployees: `${ati_url_1}/api/get-all-employee`,
  getAllMedicine: `${ati_url_2}/salesTarget/getProductList`,
  createPrescription: `${ati_url_3}/api/prescription/createPrescription`,
  img_url: `${ati_url_3}`,


  //medicine request
  RequestList: `${ati_url_3}/api/prescription`,
  getPrescriptionById: (id) =>`${ati_url_3}/api/prescription/getPrescriptionById/${id}`,
  prescriptionReceivedById: (id) =>`${ati_url_3}/api/prescription/prescriptionApproveById/${id}`,
  RequestDeleteById: (id) =>`${ati_url_3}/api/rxApprove/rxDeleteById/${id}`,

  //received request
  Received_Prescription_From_Request: `${ati_url_3}/api/prescription/getAppvedMedListAfterReview`,
  Received_Medicine_List_By_ID: (id) =>`${ati_url_3}/api/prescription/getAppvedMedListAfterReviewById/${id}`, // Add this function
  Approved_prescription_from_requestList_by_id: (id) =>`${ati_url_3}/api/rxApprove/createRxById/${id}`,

  //order list
  ordered_Prescription_list: `${ati_url_3}/api/order/getMedicineOrderList`,
  ordered_getDetailsByMedicine: (id) =>`${ati_url_3}/api/order/getDetailsByMedicine/${id}`,
  send_medicine_for_Ho: `${ati_url_3}/api/order/rxMedicinForHO`,

  //medicine delivery
  Ho_quantity_list: `${ati_url_3}/api/rxApprove/rxMedicinShowForHO`,
  Ho_medicineList_by_id: (id) =>`${ati_url_3}/api/rxApprove/rxMedicinShowForHOById/${id}`,
  Ho_medicineList_save: `${ati_url_3}/api/rxApprove/mediDeliveryByHeadOffice`,
  
  //medicine receive
  Medicine_Receive_list: `${ati_url_3}/api/distribution/rxMedicinShowForHrDept`,
  Distribution_medicineList_by_id: (id) =>`${ati_url_3}/api/distribution/rxMedicinShowForHrReceive/${id}`,
  Medi_Receive_ByHR_Office: `${ati_url_3}/api/distribution/mediReceiveByHROffice`,

  //medicine distribution
  medicineDistributionList: `${ati_url_3}/api/distribution/medicineDistributionList`,
  medicine_final_Distribution_ById: (id) =>`${ati_url_3}/api/distribution/medicineDistributionById/${id}`,
  Distributed_medicine_Delivery: (id) =>`${ati_url_3}/api/distribution/medicineDelivery/${id}`,

  //medicine due and paid report
  PaidDueList: `${ati_url_3}/api/paid/getPaidInformation`,
  DueCollection: (id) => `${ati_url_3}/api/paid/dueConnection/${id}`,
  DueList: `${ati_url_3}/api/paid/getDueInformation`,
};

export default apiEndpoints;
