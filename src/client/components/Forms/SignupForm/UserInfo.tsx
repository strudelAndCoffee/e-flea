import { useState, ChangeEvent } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

import { MONTHS, getCurrentYear } from '../../../lib'
import { DOBType } from '../../../lib/form_data.js'
import FormControlLabel from '@mui/material/FormControlLabel'

const swithLabel = { inputProps: { 'aria-label': 'Set to vendor account' } }

interface UserInfoProps {
  first_name: string
  last_name: string
  dob: DOBType
  vendor_account: boolean
}

export default function UserInfo({
  first_name,
  last_name,
  dob,
  vendor_account,
}: UserInfoProps) {
  const currentYear = getCurrentYear()
  const [selectedMonth, setSelectedMonth] = useState('')
  const [lastDayInMonth, setLastDayInMonth] = useState(31)

  const [invalidDayErr, setInvalidDayErr] = useState(false)
  const [invalidYearErr, setInvalidYearErr] = useState(false)

  const [isVendor, setIsVendor] = useState(false)

  const handleMonthSelect = (event: SelectChangeEvent) => {
    const month = event.target.value
    setSelectedMonth(month)

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
  }

  const handleDaySelect = (event: ChangeEvent<HTMLInputElement>) => {
    const day = parseInt(event.target.value)
    if (!day || day <= 0 || day > lastDayInMonth) {
      setInvalidDayErr(true)
      return
    }

    setInvalidDayErr(false)
  }

  const handleYearSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value)
    if (!year || year <= 1900 || year > currentYear) {
      setInvalidYearErr(true)
      return
    }

    setInvalidYearErr(false)
  }

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsVendor(event.target.checked)
  }

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
            {MONTHS.map((mon, idx) => (
              <MenuItem value={mon} key={idx}>
                {mon}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: '20%', flexGrow: 1 }} required>
          <TextField
            required
            inputProps={{
              inputMode: 'numeric',
              pattern: `[1-${lastDayInMonth}]*`,
            }}
            size="small"
            id="date-of-birth_day"
            label="Day"
            value={dob.day}
            onChange={handleDaySelect}
            error={invalidDayErr}
          />
        </FormControl>
        <FormControl sx={{ maxWidth: '25%', flexGrow: 1 }}>
          <TextField
            required
            inputProps={{
              inputMode: 'numeric',
              pattern: `[1900-${currentYear}]*`,
            }}
            size="small"
            id="date-of-birth_year"
            label="Year"
            value={dob.year}
            onChange={handleYearSelect}
            error={invalidYearErr}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              {...swithLabel}
              onChange={handleSwitchChange}
              name="vendor_account"
              id="vendor_account"
            />
          }
          label="Make Vendor Account"
        />
      </Grid>
    </Grid>
  )
}
