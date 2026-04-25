import * as Yup from "yup";

import {
  accountDetailsForm,
  bankDetailsForm,
  profileForm,
  securityForm,
} from "@/formik/forms/dashboard";

const { old_password, new_password, confirm_password } =
  securityForm.formFields;
export const securityFormSchema = Yup.object({
  [old_password.name]: Yup.string()
    .min(8, old_password.errMsgs.minlength)
    .required(old_password.errMsgs.required),
  [new_password.name]: Yup.string()
    .min(8, new_password.errMsgs.minlength)
    .required(new_password.errMsgs.required),
  [confirm_password.name]: Yup.string()
    .oneOf([Yup.ref("new_password")], confirm_password.errMsgs.matchPassword)
    .required(confirm_password.errMsgs.required),
});

const { first_name, last_name, email, role, phone, language } =
  profileForm.formFields;
export const profileFormSchema = Yup.object({
  [first_name.name]: Yup.string()
    .min(3, first_name.errMsgs.minlength)
    .required(first_name.errMsgs.required),
  [last_name.name]: Yup.string()
    .min(3, last_name.errMsgs.minlength)
    .required(last_name.errMsgs.required),
  [role.name]: Yup.string().required(role.errMsgs.required),
  [phone.name]: Yup.string()
    .min(9, phone.errMsgs.minlength)
    .required(phone.errMsgs.required),
  [email.name]: Yup.string()
    .email(email.errMsgs.valid)
    .required(email.errMsgs.required),
  [language.name]: Yup.string().required(language.errMsgs.required),
});

export const bankDetailsSchema = Yup.object({
  bankAccountType: Yup.string().required(
    bankDetailsForm.formFields.bankAccountType.errMsgs.required,
  ),
  bankCountry: Yup.string().required(
    bankDetailsForm.formFields.bankCountry.errMsgs.required,
  ),
  bankAccountCurrency: Yup.string().required(
    bankDetailsForm.formFields.bankAccountCurrency.errMsgs.required,
  ),
});

export const accountDetailsSchema = Yup.object({
  [accountDetailsForm.formFields.bankName.name]: Yup.string().required(
    accountDetailsForm.formFields.bankName.errMsgs.required,
  ),
  [accountDetailsForm.formFields.accountHolderName.name]: Yup.string().required(
    accountDetailsForm.formFields.accountHolderName.errMsgs.required,
  ),
  [accountDetailsForm.formFields.accountNumber.name]: Yup.number().required(
    accountDetailsForm.formFields.accountNumber.errMsgs.required,
  ),
  [accountDetailsForm.formFields.bankSortCode.name]: Yup.number().required(
    accountDetailsForm.formFields.bankSortCode.errMsgs.required,
  ),
});
