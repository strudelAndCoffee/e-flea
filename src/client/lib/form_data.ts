export type FormDataType = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob_day: number | string
  dob_month: number | string
  dob_year: number | string
  vendor_account: boolean
}

export const INITIAL_FORM_DATA: FormDataType = {
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  dob_day: '',
  dob_month: '',
  dob_year: '',
  vendor_account: false,
}
