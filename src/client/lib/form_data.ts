export type FormDataType = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob_day: number | string
  dob_month: { value: number | string; name: string }
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
  dob_month: {
    value: '',
    name: '',
  },
  dob_year: '',
  vendor_account: false,
}
