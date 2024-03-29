import { ReactElement, useState } from 'react'

export default function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0)

  function next() {
    setCurrentStepIdx((i) => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }

  function back() {
    setCurrentStepIdx((i) => {
      if (i <= 0) return i
      return i - 1
    })
  }

  function validateYear(year: string | number, currentYear: number) {
    return typeof year === 'number' && year > 1900 && year < currentYear
  }

  function validateEmail(email: string) {
    if (!email.includes('.')) return `${email}.com`
    return email
  }

  function validateUsername(username: string) {}

  return {
    steps,
    currentStepIdx,
    step: steps[currentStepIdx],
    isFirstStep: currentStepIdx === 0,
    isLastStep: currentStepIdx === steps.length - 1,
    next,
    back,
    validateYear,
    validateEmail,
  }
}
