// Copyright example template copied from Material UI: https://github.com/mui/material-ui/blob/v5.11.12/docs/data/material/getting-started/templates/sign-in/SignIn.tsx

import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://github.com/strudelAndCoffee"
        target="_blank"
      >
        strudelAndCoffee
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
