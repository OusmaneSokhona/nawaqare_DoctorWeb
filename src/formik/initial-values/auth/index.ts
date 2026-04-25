export const signUpInitialValues = {
  firstName: "",
  email: "",
  password: "",
  ConfirmPassword: "",
  agreeTerms: false,
};

export const logInitialValues = {
  email: "",
  Password: "",
  // confirm_password: '',
};

export const mainContactInitialValues = {
  first_name: "",
  last_name: "",
  company_name: "",
  registration_no: "",
  address: "",
  region: "",
  post_code: "",
  company_register_in: "",
  vat_registration_no: "",
  country: "+1",
  phone_no: "",
  registration_date: "",
  cardiology: "",
  medication: "",
  clinic: "",
  city: "",
  facilityName: "",
  issuing_authority: "",
  experience: "",
  consultationTypes: {
    video: false,
    inPerson: false,
    homeVisit: false,
  },
  videoFee: "",
  inPersonFee: "",
  homeVisitFee: "",
};

export const demographicInitialValues = {
  fullName: "",
  dob: "",
  phone: "",
  gender: "",
  idType: "",
  idNumber: "",
  expiredId: "",
  expiryDate: "",
  nationalIdentifier: "",
  demoCity: "", // ✅ renamed
  area: "",
  demoAddress: "", // ✅ renamed
  languages: [],
  aboutMe: "",
};

// formik/initial-values/auth/documentUploadInitialValues.ts

// export const documentUploadInitialValues = {
//   national_id: '',
//   passport: '',
//   medical_license: '',
//   diploma: '',
//   liability_insurance: '',
//   compliance_form: '',
//   bank_verification: '',
//   payment_authorization: '',
// };
export interface DocumentUploadValues {
  national_id: File | "";
  passport: File | "";
  medical_license: File | "";
  diploma: File | "";
  liability_insurance: File | "";
  compliance_form: File | "";
  bank_verification: File | "";
  payment_authorization: File | "";
}

export const documentUploadInitialValues: DocumentUploadValues = {
  national_id: "",
  passport: "",
  medical_license: "",
  diploma: "",
  liability_insurance: "",
  compliance_form: "",
  bank_verification: "",
  payment_authorization: "",
};

export const addUserInitialValues = {
  users: [{ email: "", role: "" }],
};
