  import React from 'react'
  import { useFormContext } from './context/formcontext'
  import BookContact from './BookContact'
  import BookTravelDeatils from './BookTravelDeatils'
  import BookReview from './BookReview'

  const FormContent = () => {
    const {step} = useFormContext()
    switch (step) {
      case 1: 
      return <BookReview/>
      case 2: 
      return <BookContact/>
      case 3:
      return <BookTravelDeatils/>
      case 4:
      return null
    }
    
  }

  export default FormContent
