import Paper from '@mui/material/Paper'
import SignupMultistepForm from './SignupMultistepForm'

export default function SignupForm() {
  return (
    <Paper elevation={3} sx={{ paddingY: 2, paddingX: 3 }}>
      <SignupMultistepForm />
    </Paper>
  )
}
