import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

interface FormButtonsProps {
  isFirstStep: boolean
  isLastStep: boolean
  back: () => void
  next: () => void
}

export default function FormButtons({
  isFirstStep,
  isLastStep,
  back,
  next,
}: FormButtonsProps) {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      {isFirstStep ? (
        <Typography>
          Already have an account?
          <Link to={'/login'}> Sign in</Link>
        </Typography>
      ) : (
        <Button type="button" onClick={back}>
          Back
        </Button>
      )}
      {!isLastStep && <Button type="submit">Next</Button>}
    </Box>
  )
}
