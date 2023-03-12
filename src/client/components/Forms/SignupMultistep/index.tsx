import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import CurrentStep from './CurrentStep.jsx'
import AccountInfo from './AccountInfo.jsx'
import UserInfo from './UserInfo.jsx'
import Verify from './Verify.jsx'
import useMultistepForm from './useMultistepForm.js'
import Button from '@mui/material/Button'

export default function SignupMultistepForm() {
  const { steps, step, currentStepIdx, isFirstStep, isLastStep, next, back } =
    useMultistepForm([<AccountInfo />, <UserInfo />, <Verify />])

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography align="right" variant="subtitle1">
          {currentStepIdx + 1} / {steps.length}
        </Typography>
        <CurrentStep
          currentStep={step}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          back={back}
          next={next}
        />
      </Paper>
    </Container>
  )
}
