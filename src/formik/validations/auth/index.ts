import * as Yup from "yup";

import {
  addUserFrom,
  documentUploadForm,
  logInForm,
  mainContactForm,
  optForm,
  resetPasswordForm,
  signUpForm,
} from "@/formik/forms/auth";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const {
  formFields: { email, password, firstName, ConfirmPassword },
} = signUpForm;

const {
  formFields: { email: resetPassEmail },
} = resetPasswordForm;

const {
  formFields: { otp },
} = optForm;

const { Password } = logInForm.formFields;

const {
  first_name,
  last_name,
  company_name,
  registration_no,
  address,
  region,
  post_code,
  company_register_in,
  vat_registration_no,
  phone_no,
  registration_date,
  city,
  clinic,
  medication,
  cardiology,
  facilityName,
} = mainContactForm.formFields;
// const {
//   national_id,
//   medical_license,
// } = documentUploadForm.formFields;
const { national_id, medical_license } = documentUploadForm.formFields;

const {} = addUserFrom.formFields;

export const signUpSchema = Yup.object({
  [firstName.name]: Yup.string()
    .required(firstName.errMsgs.required)
    .min(2, firstName.errMsgs.minlength),
  email: Yup.string()
    .email(email.errMsgs.inValid)
    .trim()
    .lowercase()
    .matches(emailRegex, { message: email.errMsgs.inValid })
    .required(email.errMsgs.required),
  password: Yup.string()
    .min(8, password.errMsgs.minlength)
    .required(password.errMsgs.required),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], ConfirmPassword.errMsgs.matchPassword)
    .required(ConfirmPassword.errMsgs.required),
});
// export const documentUploadSchema = Yup.object({
//   [national_id.name]: Yup.mixed()
//     .required(national_id.errMsgs.required),

//   [medical_license.name]: Yup.mixed()
//     .required(medical_license.errMsgs.required),
// });

export const documentUploadSchema = Yup.object({
  national_id: Yup.mixed().required(national_id.errMsgs.required),
  medical_license: Yup.mixed().required(medical_license.errMsgs.required),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email(resetPassEmail.errMsgs.inValid)
    .trim()
    .lowercase()
    .matches(emailRegex, { message: resetPassEmail.errMsgs.inValid })
    .required(resetPassEmail.errMsgs.required),
});

// export const demographicSchema = Yup.object({
//   [fullName.name]: Yup.string()
//     .required(fullName.errMsgs.required)
//     .min(2, fullName.errMsgs.minlength),

//   [dob.name]: Yup.date().required(dob.errMsgs.required),

//   [phone.name]: Yup.string()
//     .required(phone.errMsgs.required)
//     .min(8, phone.errMsgs.minlength),

//   [gender.name]: Yup.string().required(gender.errMsgs.required),

//   [idType.name]: Yup.string().required(idType.errMsgs.required),

//   [idNumber.name]: Yup.string()
//     .required(idNumber.errMsgs.required)
//     .min(5, idNumber.errMsgs.minlength),

//   [expiryDate.name]: Yup.date()
//     .required(expiryDate.errMsgs.required),

//   [demoCity.name]: Yup.string()
//     .required(demoCity.errMsgs.required),

//   [area.name]: Yup.string()
//     .required(area.errMsgs.required),

//   [demoAddress.name]: Yup.string()
//     .required(demoAddress.errMsgs.required),

//   [languages.name]: Yup.array()
//     .min(1, languages.errMsgs.required),

//   [aboutMe.name]: Yup.string()
//     .required(aboutMe.errMsgs.required)
//     .min(20, aboutMe.errMsgs.minlength),
// });

export const newPasswordSchema = Yup.object({
  // newPassword: Yup.string().min(8, new_password.errMsgs.minlength).required(new_password.errMsgs.required),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password')], confirm_password.errMsgs.matchPassword)
  //   .required(confirm_password.errMsgs.required),
});

export const optSchema = Yup.object({
  otp: Yup.string()
    .required(otp.errMsgs.required)
    .min(1, otp.errMsgs.minlength)
    .max(6, otp.errMsgs.maxlength),
});

export const loginSchema = Yup.object({
  [email.name]: Yup.string()
    .email(email.errMsgs.inValid)
    .trim()
    .lowercase()
    .matches(emailRegex, { message: email.errMsgs.inValid })
    .required(email.errMsgs.required),
  Password: Yup.string()
    .min(8, Password.errMsgs.minlength)
    .required(Password.errMsgs.required),
  // [new_password.name]: Yup.string().min(8, new_password.errMsgs.minlength).required(new_password.errMsgs.required),
  // [confirm_password.name]: Yup.string()
  //   .oneOf([Yup.ref('password')], confirm_password.errMsgs.matchPassword)
  //   .required(confirm_password.errMsgs.required),
});

export const mainContactSchema = Yup.object({
  [first_name.name]: Yup.string()
    .required(first_name.errMsgs.required)
    .min(2, first_name.errMsgs.minlength),
  [last_name.name]: Yup.string()
    .required(last_name.errMsgs.required)
    .min(2, last_name.errMsgs.minlength),
  [company_name.name]: Yup.string()
    .required(company_name.errMsgs.required)
    .min(2, company_name.errMsgs.minlength),
  [registration_no.name]: Yup.string()
    .required(registration_no.errMsgs.required)
    .min(2, registration_no.errMsgs.minlength),
  [registration_date.name]: Yup.date().required(
    registration_date.errMsgs.required,
  ),
  [address.name]: Yup.string()
    .required(address.errMsgs.required)
    .min(2, address.errMsgs.minlength),
  [facilityName.name]: Yup.string().required(facilityName.errMsgs.required),
  [region.name]: Yup.string()
    .required(region.errMsgs.required)
    .min(2, region.errMsgs.minlength),
  [post_code.name]: Yup.string().required(post_code.errMsgs.required),
  [company_register_in.name]: Yup.string().required(
    company_register_in.errMsgs.required,
  ),
  [vat_registration_no.name]: Yup.string()
    .required(vat_registration_no.errMsgs.required)
    .min(2, vat_registration_no.errMsgs.minlength),
  [phone_no.name]: Yup.number()
    .required(phone_no.errMsgs.required)
    .min(5, phone_no.errMsgs.minlength),
  [cardiology.name]: Yup.string().required(cardiology.errMsgs.required),

  [medication.name]: Yup.string().required(medication.errMsgs.required),

  [clinic.name]: Yup.string().required(clinic.errMsgs.required),

  [city.name]: Yup.string().required(city.errMsgs.required),
  issuing_authority: Yup.string().required("Issuing authority is required"),
  experience: Yup.number().required("Experience is required").min(0),
});

export const addUserSchema = Yup.object({
  users: Yup.array().of(
    Yup.object({
      email: Yup.string()
        .email(addUserFrom.formFields.adduser.errMsgs.inValid)
        .trim()
        .lowercase()
        .matches(emailRegex, {
          message: addUserFrom.formFields.adduser.errMsgs.inValid,
        })
        .required(addUserFrom.formFields.adduser.errMsgs.required),
      role: Yup.string().required(addUserFrom.formFields.role.errMsgs.required),
    }),
  ),
});
