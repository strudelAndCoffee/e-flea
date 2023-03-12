import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { MONTHS, DAYS, getCurrentYear } from '../../../lib'
import Input from '@mui/material/Input'

export default function UserInfo() {
  const currentYear = getCurrentYear()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [lastDayInMonth, setLastDayInMonth] = useState(31)

  const handleMonthChange = (event: SelectChangeEvent) => {
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
        />
      </Grid>
      <Grid item xs={12}>
        <Typography margin={0} mt={1} pl={1} variant="body1" align="center">
          Date of Birth
        </Typography>
      </Grid>
      <Grid
        item
        padding={0}
        margin={0}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: 1,
        }}
      >
        <FormControl sx={{ maxWidth: '55%', flexGrow: 1 }} required>
          <InputLabel id="date-of-birth-month-select-label">Month</InputLabel>
          <Select
            size="small"
            labelId="date-of-birth-month-select-label"
            id="date-of-birth-month-select"
            value={selectedMonth}
            label="Month"
            onChange={handleMonthChange}
          >
            {MONTHS.map((mon, idx) => (
              <MenuItem value={mon} key={mon + idx}>
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
            id="date-of-birth-year-select"
            label="Day"
            // value={age}
            // onChange={}
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
            id="date-of-birth-year-select"
            label="Year"
            // value={age}
            // onChange={}
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}
