import { FormEvent, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import FormHeader from './FormHeader.js'
import AccountInfo from './AccountInfo.js'
import UserInfo from './UserInfo.js'
import Verify from './Verify.js'
import FormButtons from './FormButtons.js'
import useMultistepForm from './useMultistepForm.js'
import { INITIAL_FORM_DATA, FormDataType } from '../../../lib/form_data.js'
import { getCurrentYear } from '../../../lib/dob.js'

export default function SignupMultistepForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [invalidYear, setInvalidYear] = useState(false)
  const {
    steps,
    step,
    currentStepIdx,
    isFirstStep,
    isLastStep,
    next,
    back,
    validateYear,
    validateEmail,
  } = useMultistepForm([
    <AccountInfo {...formData} updateFields={updateFields} />,
    <UserInfo
      {...formData}
      updateFields={updateFields}
      invalidYear={invalidYear}
    />,
    <Verify {...formData} updateFields={updateFields} />,
  ])

  function updateFields(fields: Partial<FormDataType>) {
    setFormData((prev) => {
      return { ...prev, ...fields }
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log(formData)

    if (isFirstStep) {
      const validEmail = validateEmail(formData.email)
      updateFields({ email: validEmail })
    }

    if (currentStepIdx === 1) {
      const dob_year = formData.dob_year
      const valid_year = validateYear(dob_year, getCurrentYear())

      if (!valid_year) {
        setInvalidYear(true)
        return
      }
      if (valid_year && invalidYear) {
        setInvalidYear(false)
        return next()
      }
    }

    if (isLastStep) {
      alert('form submitted')
      return
    }

    next()
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
