import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import SignupForm from './SignupForm.jsx'
import SignupStepOne from './SignupStepOne.jsx'
import SignupStepTwo from './SignupStepTwo.jsx'
import useMultistepForm from './useMultistepForm.js'
import Button from '@mui/material/Button'

export default function SignupMultistepForm() {
  const { steps, currentStepIdx, isFirstStep, isLastStep } = useMultistepForm(
    []
  )
  const [currentStep, setCurrentStep] = useState(steps[currentStepIdx])

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography align="right" variant="subtitle1">
          {currentStepIdx} / {steps.length}
        </Typography>
        <SignupForm currentStep={currentStep} />
        <Box display="flex" justifyContent="space-between">
          <Button disabled={isFirstStep}>{isFirstStep ? '' : 'Back'}</Button>
          <Button disabled={isLastStep}>{isLastStep ? '' : 'Next'}</Button>
        </Box>
      </Paper>
    </Container>
  )
}
