import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import FormHeader from './FormHeader.js'
import AccountInfo from './AccountInfo.js'
import UserInfo from './UserInfo.js'
import Verify from './Verify.js'
import FormButtons from './FormButtons.js'
import useMultistepForm from './useMultistepForm.js'
import { INITIAL_FORM_DATA } from '../../../lib/form_data.js'

export default function SignupMultistepForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const { steps, step, currentStepIdx, isFirstStep, isLastStep, next, back } =
    useMultistepForm([
      <AccountInfo {...formData} />,
      <UserInfo {...formData} />,
      <Verify {...formData} />,
    ])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <Typography align="right" variant="subtitle1">
        {currentStepIdx + 1} / {steps.length}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          minHeight: 460,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormHeader />
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* Current Step */}
          {step}
        </Box>
        <FormButtons
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          back={back}
          next={next}
        />
      </Box>
    </>
  )
}
