// Starter code for SignIn form component example template copied from Material UI: https://github.com/mui/material-ui/blob/v5.11.12/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
// Starter code for MultiSelect component example template copied from Material UI: https://mui.com/material-ui/react-select/
import { FormEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { Theme, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { CATEGORIES } from '../../lib/categories'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'

import { useAuthStore } from '../../state'

const swithLabel = { inputProps: { 'aria-label': 'Use default image' } }
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(
  name: string,
  categoryName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function CreateVendorForm() {
  const theme = useTheme()
  const navigate = useNavigate()
  const userId = useAuthStore((state) => state.userID)

  const [defaultImg, setDefaultImg] = useState(true)
  const [categoryName, setCategoryName] = useState<string[]>([])

  const handleSelectChange = (
    event: SelectChangeEvent<typeof categoryName>
  ) => {
    const {
      target: { value },
    } = event
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultImg(e.target.checked)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const store_title = data.get('store_title')
    const store_description = data.get('store_description')
    const categories = categoryName
    const store_image_url = defaultImg ? undefined : data.get('store_image_url')
    const store_image_alt = defaultImg ? undefined : data.get('store_image_alt')

    const image = { store_image_url, store_image_alt }
    const owner_id = userId

    try {
      const response = await axios.post(
        'http://localhost:3000/api/vendors',
        {
          owner_id,
          store_title,
          store_description,
          categories,
          image,
        },
        { withCredentials: true }
      )

      console.log(response)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert(
        'An error occured. Please check that all fields are filled and accurate.'
      )
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <BuildCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Build Your Store
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="store_title"
              label="Store Title"
              name="store_title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="store_description"
              label="Describe Your Store"
              name="store_description"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth>
              <InputLabel
                id="categoriesLabel"
                sx={{ backgroundColor: 'white', pr: 1 }}
              >
                Select Categories
              </InputLabel>
              <Select
                multiple
                labelId="categoriesLabel"
                id="categories"
                value={categoryName}
                onChange={handleSelectChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected: any[]) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: string) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {CATEGORIES.map(({ cat_id, cat_name }) => (
                  <MenuItem
                    key={`${cat_id}${cat_name}`}
                    value={cat_name}
                    style={getStyles(cat_name, categoryName, theme)}
                  >
                    {cat_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  {...swithLabel}
                  defaultChecked
                  onChange={handleSwitchChange}
                  name="default_image"
                  id="default_image"
                />
              }
              label="Use Default Image"
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <Button
                disabled
                variant="outlined"
                name="store_image_url"
                id="store_image_url"
              >
                Upload Image
              </Button>
              <TextField
                required={!defaultImg}
                disabled={defaultImg}
                name="store_image_url"
                label="Paste Image URL"
                id="store_image_url"
                size="small"
                sx={{ flexGrow: 1 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required={!defaultImg}
              disabled={defaultImg}
              name="store_image_alt"
              label="Describe the Image"
              id="store_image_alt"
              size="small"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: '50%' }}
          >
            Finish
          </Button>
        </Box>
        {/* <Grid container justifyContent="flex-end">
            <Grid item>
              Already have an account?
              <Link to={'/login'}> Sign in</Link>
            </Grid>
          </Grid> */}
      </Box>
    </Box>
  )
}
