export const signUpForm = {
  id: "01-sign-in-form",
  formFields: {
    email: {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter your email",
      errMsgs: {
        required: "Email Address is required.",
        inValid: "Email must be valid.",
      },
    },
    password: {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Password is required.",
        minlength: "Password must be at least 8 characters long",
      },
    },
    firstName: {
      type: "text",
      name: "firstName",
      label: "Full Name",
      placeholder: "Enter your first name",
      errMsgs: {
        required: "First Name is required.",
        minlength: "First Name must be at least 2 characters long",
      },
    },
    ConfirmPassword: {
      type: "password",
      name: "ConfirmPassword",
      label: "Confirm Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Confirm Password is required.",
        matchPassword: "Confirm Password must be match",
      },
    },
  },
};

export const resetPasswordForm = {
  id: "02-forgot-password-form",
  formFields: {
    email: {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter your email",
      errMsgs: {
        required: "Email Address is required.",
        inValid: "Email must be valid.",
      },
    },
  },
};

export const newPasswordForm = {
  id: "03-new-password-form",
  formFields: {
    currentPassword: {
      type: "password",
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Password is required.",
        minlength: "Password must be at least 8 characters long",
      },
    },
    newPassword: {
      type: "password",
      name: "newPassword",
      label: "Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Password is required.",
        minlength: "Password must be at least 8 characters long",
      },
    },
    confirmPassword: {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Confirm Password is required.",
        matchPassword: "Confirm Password must be match",
      },
    },
  },
};

export const optForm = {
  id: "04-otp-form",
  formFields: {
    otp: {
      type: "text",
      name: "otp",
      label: "OTP",
      placeholder: "Enter your OTP",
      errMsgs: {
        required: "OTP is required.",
        minlength: "OTP must be at least 1 characters long",
        maxlength: "OTP must be at most 6 characters long",
      },
    },
  },
};

export const logInForm = {
  id: "05-sign-up-form",
  formFields: {
    email: {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter your email",
      errMsgs: {
        required: "Email Address is required.",
        inValid: "Email must be valid.",
      },
    },
    // new_password: {
    //   type: "password",
    //   name: "password",
    //   label: "Password",
    //   placeholder: "Enter your password",
    //   errMsgs: {
    //     required: "Password is required.",
    //     minlength: "Password must be at least 8 characters long",
    //   },
    // },
    // confirm_password: {
    //   type: "password",
    //   name: "confirm_password",
    //   label: "Confirm Password",
    //   placeholder: "Enter your password",
    //   errMsgs: {
    //     required: "Confirm Password is required.",
    //     minlength: "Password must be match",
    //     matchPassword: "Password must be match",
    //   },
    // },
    Password: {
      type: "password",
      name: "Password",
      label: "Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Password is required.",
        minlength: "Password must be at least 8 characters long",
      },
    },
  },
};

export const mainContactForm = {
  id: "06-main-contact-form",
  formFields: {
    first_name: {
      type: "text",
      name: "first_name",
      label: "First Name",
      placeholder: "Enter your first name",
      errMsgs: {
        required: "First Name is required.",
        minlength: "First Name must be at least 2 characters long",
      },
    },
    last_name: {
      type: "text",
      name: "last_name",
      label: "Last Name",
      placeholder: "Enter your last name",
      errMsgs: {
        required: "Last Name is required.",
        minlength: "Last Name must be at least 2 characters long",
      },
    },
    company_name: {
      type: "text",
      name: "company_name",
      label: "Company Name",
      placeholder: "Enter your company name",
      errMsgs: {
        required: "Company Name is required.",
        minlength: "Company Name must be at least 2 characters long",
      },
    },
    registration_no: {
      type: "text",
      name: "registration_no",
      label: "Registration No",
      placeholder: "Enter your registration no",
      errMsgs: {
        required: "Registration No is required.",
        minlength: "Registration No must be at least 2 characters long",
      },
    },
    registration_date: {
      type: "date",
      name: "registration_date",
      label: "Registration Date",
      placeholder: "Select registration date",
      errMsgs: {
        required: "Registration date is required.",
      },
    },

    address: {
      type: "text",
      name: "address",
      label: "Address",
      placeholder: "Enter your address",
      errMsgs: {
        required: "Address is required.",
        minlength: "Address must be at least 2 characters long",
      },
    },
    facilityName: {
      type: "text",
      name: "facilityName",
      label: "Facility name",
      placeholder: "Allied Hospital, Faisalabad",
      errMsgs: {
        required: "Facility name is required.",
        // minlength: "Address must be at least 2 characters long",
      },
    },
    region: {
      type: "text",
      name: "region",
      label: "Issuing authority",
      placeholder: "Issuing authority",
      errMsgs: {
        required: "Issuing authority",
        minlength: "Region must be at least 2 characters long",
      },
    },
    post_code: {
      type: "text",
      name: "post_code",
      label: "Experience (in years)",
      placeholder: "7",
      errMsgs: {
        required: "Experience is required.",
        // minlength: 'Post Code must be at least 2 characters long',
      },
    },
    company_register_in: {
      type: "text",
      name: "company_register_in",
      label: "Company Register In",
      placeholder: "Enter your company register in",
      errMsgs: {
        required: "Company Register In is required.",
      },
    },
    cardiology: {
      type: "dropdown",
      name: "cardiology",
      label: "Primary specialty",
      placeholder: "Select cardiology",
      errMsgs: {
        required: "Cardiology is required.",
      },
    },

    medication: {
      type: "dropdown",
      name: "medication",
      label: "Secondary specialties(optional)",
      placeholder: "Select medication",
      errMsgs: {
        required: "Medication is required.",
      },
    },

    clinic: {
      type: "dropdown",
      name: "clinic",
      label: "Facility type",
      placeholder: "Select clinic",
      errMsgs: {
        required: "Clinic is required.",
      },
    },

    city: {
      type: "dropdown",
      name: "city",
      label: "City",
      placeholder: "Select city",
      errMsgs: {
        required: "City is required.",
      },
    },

    vat_registration_no: {
      type: "text",
      name: "vat_registration_no",
      label: "VAT Registration No",
      placeholder: "Enter your VAT registration no",
      errMsgs: {
        required: "VAT Registration No is required.",
        minlength: "VAT Registration No must be at least 2 characters long",
      },
    },
    phone_no: {
      type: "number",
      name: "phone_no",
      label: "Phone No",
      placeholder: "Enter your phone no",
      errMsgs: {
        required: "Phone No is required.",
        minlength: "Phone No must be at least 3 characters long",
      },
    },
    issuing_authority: {
      name: "issuing_authority",
      label: "Issuing authority",
      placeholder: "Issuing authority",
      errMsgs: { required: "Issuing authority is required" },
    },

    experience: {
      name: "experience",
      label: "Experience (in years)",
      placeholder: "Experience",
      errMsgs: { required: "Experience is required" },
    },

    consultationTypes: {
      name: "consultationTypes",
      label: "Consultation types",
    },

    videoFee: {
      name: "videoFee",
      label: "Video fee",
      placeholder: "Video fee",
    },

    inPersonFee: {
      name: "inPersonFee",
      label: "In-person fee",
      placeholder: "In-person fee",
    },

    homeVisitFee: {
      name: "homeVisitFee",
      label: "Home visit fee",
      placeholder: "Home visit fee",
    },
  },
};

export const demographicForm = {
  formFields: {
    fullName: {
      name: "fullName",
      label: "Full Name",
      errMsgs: {
        required: "Full name is required",
        minlength: "Minimum 2 characters required",
      },
    },
    dob: {
      name: "dob",
      label: "Date Of Birth",
      errMsgs: { required: "Date of birth is required" },
    },
    phone: {
      name: "phone",
      label: "Phone Number",
      errMsgs: {
        required: "Phone number is required",
        minlength: "Invalid phone number",
      },
    },
    gender: {
      name: "gender",
      label: "Gender",
      errMsgs: { required: "Gender is required" },
    },
    idType: {
      name: "idType",
      label: "ID Type",
      errMsgs: { required: "ID type is required" },
    },
    idNumber: {
      name: "idNumber",
      label: "ID Number",
      errMsgs: {
        required: "ID number is required",
        minlength: "Invalid ID number",
      },
    },
    expiryDate: {
      name: "expiryDate",
      label: "Expiry date",
      errMsgs: { required: "Expiry date is required" },
    },

    // 🔴 CHANGED HERE
    demoCity: {
      name: "demoCity",
      label: "City",
      errMsgs: { required: "City is required" },
    },
    area: {
      name: "area",
      label: "Area",
      errMsgs: { required: "Area is required" },
    },
    demoAddress: {
      name: "demoAddress",
      label: "Address",
      errMsgs: { required: "Address is required" },
    },

    languages: {
      name: "languages",
      label: "Spoken languages",
      errMsgs: { required: "Select at least one language" },
    },
    aboutMe: {
      name: "aboutMe",
      label: "About Me",
      errMsgs: {
        required: "About me is required",
        minlength: "Minimum 20 characters required",
      },
    },
  },
};

export const demoForm = {
  id: "06-main-contact-form",
  formFields: {
    first_name: {
      type: "text",
      name: "first_name",
      label: "First Name",
      placeholder: "Enter your first name",
      errMsgs: {
        required: "First Name is required.",
        minlength: "First Name must be at least 2 characters long",
      },
    },
    last_name: {
      type: "text",
      name: "last_name",
      label: "Last Name",
      placeholder: "Enter your last name",
      errMsgs: {
        required: "Last Name is required.",
        minlength: "Last Name must be at least 2 characters long",
      },
    },
    company_name: {
      type: "text",
      name: "company_name",
      label: "Company Name",
      placeholder: "Enter your company name",
      errMsgs: {
        required: "Company Name is required.",
        minlength: "Company Name must be at least 2 characters long",
      },
    },
    registration_no: {
      type: "text",
      name: "registration_no",
      label: "Registration No",
      placeholder: "Enter your registration no",
      errMsgs: {
        required: "Registration No is required.",
        minlength: "Registration No must be at least 2 characters long",
      },
    },
    address: {
      type: "text",
      name: "address",
      label: "Address",
      placeholder: "Enter your address",
      errMsgs: {
        required: "Address is required.",
        minlength: "Address must be at least 2 characters long",
      },
    },
    region: {
      type: "text",
      name: "region",
      label: "Region",
      placeholder: "Enter your region",
      errMsgs: {
        required: "Region is required.",
        minlength: "Region must be at least 2 characters long",
      },
    },
    post_code: {
      type: "text",
      name: "post_code",
      label: "Post Code",
      placeholder: "Enter your post code",
      errMsgs: {
        required: "Post Code is required.",
        minlength: "Post Code must be at least 2 characters long",
      },
    },
    company_register_in: {
      type: "text",
      name: "company_register_in",
      label: "Company Register In",
      placeholder: "Enter your company register in",
      errMsgs: {
        required: "Company Register In is required.",
      },
    },
    vat_registration_no: {
      type: "text",
      name: "vat_registration_no",
      label: "VAT Registration No",
      placeholder: "Enter your VAT registration no",
      errMsgs: {
        required: "VAT Registration No is required.",
        minlength: "VAT Registration No must be at least 2 characters long",
      },
    },
    phone_no: {
      type: "number",
      name: "phone_no",
      label: "Phone No",
      placeholder: "Enter your phone no",
      errMsgs: {
        required: "Phone No is required.",
        minlength: "Phone No must be at least 3 characters long",
      },
    },
  },
};

// formik/forms/auth/documentUploadForm.ts

// export const documentUploadForm = {
//   id: "07-document-upload-form",
//   formFields: {
//     national_id: {
//       type: "file",
//       name: "national_id",
//       label: "National Identity Document",
//       errMsgs: {
//         required: "National ID document is required",
//       },
//     },
//     passport: {
//       type: "file",
//       name: "passport",
//       label: "Passport or ID Proof",
//       errMsgs: {},
//     },
//     medical_license: {
//       type: "file",
//       name: "medical_license",
//       label: "Medical License",
//       errMsgs: {
//         required: "Medical license is required",
//       },
//     },
//     diploma: {
//       type: "file",
//       name: "diploma",
//       label: "Diploma / Certification",
//       errMsgs: {},
//     },
//     liability_insurance: {
//       type: "file",
//       name: "liability_insurance",
//       label: "Liability Insurance Proof",
//       errMsgs: {},
//     },
//     compliance_form: {
//       type: "file",
//       name: "compliance_form",
//       label: "CMRO / GDPR Forms",
//       errMsgs: {},
//     },
//     bank_verification: {
//       type: "file",
//       name: "bank_verification",
//       label: "Bank Verification Letter",
//       errMsgs: {},
//     },
//     payment_authorization: {
//       type: "file",
//       name: "payment_authorization",
//       label: "Payment Authorization",
//       errMsgs: {},
//     },
//   },
// };
export const documentUploadForm = {
  id: "07-document-upload-form",
  formFields: {
    national_id: {
      type: "file",
      name: "national_id",
      label: "National Identity Document",
      errMsgs: { required: "National ID document is required" },
    },
    passport: {
      type: "file",
      name: "passport",
      label: "Passport or ID Proof",
      errMsgs: {},
    },
    medical_license: {
      type: "file",
      name: "medical_license",
      label: "Medical License",
      errMsgs: { required: "Medical license is required" },
    },
    diploma: {
      type: "file",
      name: "diploma",
      label: "Diploma / Certification",
      errMsgs: {},
    },
    liability_insurance: {
      type: "file",
      name: "liability_insurance",
      label: "Liability Insurance Proof",
      errMsgs: {},
    },
    compliance_form: {
      type: "file",
      name: "compliance_form",
      label: "CMRO / GDPR Forms",
      errMsgs: {},
    },
    bank_verification: {
      type: "file",
      name: "bank_verification",
      label: "Bank Verification Letter",
      errMsgs: {},
    },
    payment_authorization: {
      type: "file",
      name: "payment_authorization",
      label: "Payment Authorization",
      errMsgs: {},
    },
  },
};

export const addUserFrom = {
  id: "07-add-user-form",
  formFields: {
    adduser: {
      type: "email",
      name: "adduser",
      label: "User",
      placeholder: "Enter your email address",
      errMsgs: {
        required: "Email is required.",
        inValid: "Email must be valid.",
      },
    },
    role: {
      type: "text",
      name: "role",
      label: "Role",
      placeholder: "Select Role",
      errMsgs: {
        required: "Role is required.",
      },
    },
  },
};
