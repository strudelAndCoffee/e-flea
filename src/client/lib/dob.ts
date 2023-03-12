const MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function getCurrentYear() {
  return new Date(Date.now()).getFullYear()
}

export { MONTHS, getCurrentYear }
