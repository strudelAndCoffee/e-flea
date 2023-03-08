import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'

// Starter code for AppBar with Search Field example template copied from Material UI: https://mui.com/material-ui/react-app-bar/

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function SearchBar() {
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const [searchText, setSearchText] = useState('')

  // const filteredProducts =
  //   query === ''
  //     ? products
  //     : products.filter((item) => {
  //         return item.toLowerCase().includes(query.toLowerCase())
  //       })

  return (
    <Box display="flex" justifyContent="center" flexGrow={1}>
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              if (!searchText || searchText === '') return
              console.log(searchText)
            }
          }}
        />
      </SearchWrapper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (!searchText || searchText === '') return
          console.log(searchText)
        }}
      >
        Search
      </Button>
    </Box>
  )
}
