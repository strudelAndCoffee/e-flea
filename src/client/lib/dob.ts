const MONTHS: { value: number; name: string }[] = [
  {
    value: 1,
    name: 'January',
  },
  {
    value: 2,
    name: 'February',
  },
  {
    value: 3,
    name: 'March',
  },
  {
    value: 4,
    name: 'April',
  },
  {
    value: 5,
    name: 'May',
  },
  {
    value: 6,
    name: 'June',
  },
  {
    value: 7,
    name: 'July',
  },
  {
    value: 8,
    name: 'August',
  },
  {
    value: 9,
    name: 'September',
  },
  {
    value: 10,
    name: 'October',
  },
  {
    value: 11,
    name: 'November',
  },
  {
    value: 12,
    name: 'December',
  },
]

const DAYS: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
]

function getCurrentYear() {
  return new Date().getFullYear()
}

export { MONTHS, DAYS, getCurrentYear }
