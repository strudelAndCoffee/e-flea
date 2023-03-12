import { useState, useEffect, ChangeEvent } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

import { MONTHS, DAYS, getCurrentYear } from '../../../lib'
import FormControlLabel from '@mui/material/FormControlLabel'

const swithLabel = { inputProps: { 'aria-label': 'Set to vendor account' } }

type UserInfoData = {
  first_name: string
  last_name: string
  dob_day: number | string
  dob_month: number | string
  dob_year: number | string
  vendor_account: boolean
}
type UserInfoProps = UserInfoData & {
  updateFields: (fields: Partial<UserInfoData>) => void
  invalidYear: boolean
}

export default function UserInfo({
  first_name,
  last_name,
  dob_day,
  dob_month,
  dob_year,
  vendor_account,
  updateFields,
  invalidYear,
}: UserInfoProps) {
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [lastDayInMonth, setLastDayInMonth] = useState(31)
  const [isInvalidYear, setIsInvalidYear] = useState(false)

  const currentYear = getCurrentYear()
  const filteredDays = DAYS.filter((day) => day <= lastDayInMonth)

  const handleMonthSelect = (event: SelectChangeEvent) => {
    const month = event.target.value

    let lastDay

    if (month === 'February') {
      lastDay = 29
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      lastDay = 30
    } else lastDay = 31

    setLastDayInMonth(lastDay)
    setSelectedMonth(month)

    let monthVal = MONTHS.filter((mon) => mon.name === month)
    updateFields({ dob_month: monthVal[0].value })
  }

  const handleDaySelect = (event: SelectChangeEvent) => {
    const day = event.target.value
    setSelectedDay(day)
    const dayVal = parseInt(day)
    if (typeof dayVal === 'number') updateFields({ dob_day: day })
  }

  const handleYearSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const year = event.target.value
    setSelectedYear(year)
    const yearVal = parseInt(event.target.value)
    if (typeof yearVal === 'number') updateFields({ dob_year: yearVal })
  }

  useEffect(() => setIsInvalidYear(invalidYear), [invalidYear])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          User Info
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="first_name"
          label="First Name"
          name="first_name"
          autoComplete="first_name"
          value={first_name}
          onChange={(e) => updateFields({ first_name: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="last_name"
          label="Last Name"
          name="last_name"
          autoComplete="last_name"
          value={last_name}
          onChange={(e) => updateFields({ last_name: e.target.value })}
        />
      </Grid>
      <Grid
        item
        padding={0}
        margin={0}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography pl={1} variant="body1" align="center">
          Date of Birth
        </Typography>
        <FormControl sx={{ maxWidth: '50%', flexGrow: 1 }} required>
          <InputLabel id="date-of-birth-month-label">Month</InputLabel>
          <Select
            size="small"
            labelId="date-of-birth-month-label"
            id="date-of-birth_month"
            label="Month"
            value={selectedMonth}
            onChange={handleMonthSelect}
          >
            {MONTHS.map((mon) => (
              <MenuItem value={mon.name} key={mon.value}>
                {mon.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: '20%', flexGrow: 1 }} required>
          <InputLabel id="date-of-birth-day-label">Day</InputLabel>
          <Select
            size="small"
            labelId="date-of-birth-day-label"
            id="date-of-birth_day"
            label="Day"
            value={selectedDay}
            onChange={handleDaySelect}
          >
            {filteredDays.map((day) => (
              <MenuItem value={day} key={`day${day}`}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: '25%', flexGrow: 1 }}>
          <TextField
            required
            inputProps={{
              inputMode: 'numeric',
            }}
            size="small"
            id="date-of-birth_year"
            label="Year (yyyy)"
            value={selectedYear}
            onChange={handleYearSelect}
            error={isInvalidYear}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              {...swithLabel}
              name="vendor_account"
              id="vendor_account"
              value={vendor_account}
              onChange={(e) =>
                updateFields({ vendor_account: e.target.checked })
              }
            />
          }
          label="Make Vendor Account"
        />
      </Grid>
    </Grid>
  )
}
