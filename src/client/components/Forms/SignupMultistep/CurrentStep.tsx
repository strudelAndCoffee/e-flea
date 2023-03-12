import { ReactElement, FormEvent } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface SignupFormProps {
  currentStep: ReactElement
  isFirstStep: boolean
  isLastStep: boolean
  back: () => void
  next: () => void
}

export default function CurrentStep({
  currentStep,
  isFirstStep,
  isLastStep,
  back,
  next,
}: SignupFormProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {currentStep}
        <Box display="flex" justifyContent="space-between">
          <Button type="button" disabled={isFirstStep} onClick={back}>
            {isFirstStep ? '' : 'Back'}
          </Button>
          <Button type="submit" disabled={isLastStep} onClick={next}>
            {isLastStep ? '' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
