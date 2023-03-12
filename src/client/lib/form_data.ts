export type DOBType = {
  day: number | undefined
  month: number | undefined
  year: number | undefined
}
type FormDataType = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob: DOBType
  vendor_account: boolean
}

export const INITIAL_FORM_DATA: FormDataType = {
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  dob: {
    day: undefined,
    month: undefined,
    year: undefined,
  },
  vendor_account: false,
}
