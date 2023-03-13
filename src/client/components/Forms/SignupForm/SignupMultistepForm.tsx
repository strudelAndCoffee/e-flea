// Starter code for SignIn form component example copied from Material UI: https://github.com/mui/material-ui/blob/v5.11.12/docs/data/material/getting-started/templates/sign-up/SignUp.tsx

import { FormEvent, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
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

import { shallow } from 'zustand/shallow'
import { useAuthStore, useNavStore } from '../../../state'

export default function SignupMultistepForm() {
  const { setIsLoggedIn, setUserID } = useAuthStore(
    (state) => ({
      setIsLoggedIn: state.setIsLoggedIn,
      setUserID: state.setUserID,
    }),
    shallow
  )
  const { fromRedirect, setFromRedirect } = useNavStore(
    (state) => ({
      fromRedirect: state.fromRedirect,
      setFromRedirect: state.setFromRedirect,
    }),
    shallow
  )
  const navigate = useNavigate()
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
    <Verify {...formData} />,
  ])

  function updateFields(fields: Partial<FormDataType>) {
    setFormData((prev) => {
      return { ...prev, ...fields }
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (isFirstStep) {
      const validEmail = validateEmail(formData.email)
      updateFields({ email: validEmail })

      // check unique username
      // alert('This account already exists. Please try a different username')
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

    if (!isLastStep) {
      return next()
    }

    const {
      username,
      email,
      password,
      first_name,
      last_name,
      dob_day,
      dob_month,
      dob_year,
      vendor_account,
    } = formData

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/users/signup',
        {
          username,
          email,
          password,
          first_name,
          last_name,
          dob: {
            day: dob_day as number,
            month: dob_month.value as number,
            year: dob_year as number,
          },
          vendor_account,
        },
        { withCredentials: true }
      )

      console.log(response)

      setUserID(response.data.new_user._id)
      setIsLoggedIn(true)
      if (fromRedirect) {
        setFromRedirect(false)
        return navigate(-1)
      }
      navigate('/')
    } catch (err) {
      console.error(err)
    }
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
