import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { MONTHS, DAYS } from '../../../lib'

export default function UserInfo() {
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [filteredDays, setFilteredDays] = useState(DAYS)

  // const unselectDay = (day: number) => {
  //   if (
  //     (day > 30 &&
  //       (selectedMonth === 'April' ||
  //         selectedMonth === 'June' ||
  //         selectedMonth === 'September' ||
  //         selectedMonth === 'November')) ||
  //     (day > 29 && selectedMonth === 'February')
  //   )
  //     return true

  //   return false
  // }

  const handleMonthChange = (event: SelectChangeEvent) => {
    const month = event.target.value
    setSelectedMonth(month)

    let totalDays

    if (month === 'February') {
      totalDays = DAYS.filter((day) => day <= 29)
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      totalDays = DAYS.filter((day) => day <= 30)
    } else totalDays = DAYS

    setFilteredDays(totalDays)
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
        <FormControl sx={{ maxWidth: '50%', flexGrow: 1 }} required>
          <InputLabel id="date-of-birth-month-select-label">Month</InputLabel>
          <Select
            size="small"
            labelId="date-of-birth-month-select-label"
            id="date-of-birth-month-select"
            value={selectedMonth}
            label="Month"
            onChange={handleMonthChange}
          >
            {MONTHS.map((mon) => (
              <MenuItem value={mon}>{mon}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: '20%', flexGrow: 1 }} required>
          <InputLabel id="date-of-birth-day-select-label">Day</InputLabel>
          <Select
            size="small"
            type="number"
            labelId="date-of-birth-day-select-label"
            id="date-of-birth-day-select"
            // value={age}
            label="Day"
            // onChange={handleChange}
          >
            {filteredDays.map((day) => (
              <MenuItem value={day}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: '30%', flexGrow: 1 }} required>
          <InputLabel id="date-of-birth-year-select-label">Year</InputLabel>
          <Select
            size="small"
            labelId="date-of-birth-year-select-label"
            id="date-of-birth-year-select"
            // value={age}
            label="Year"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  )
}
