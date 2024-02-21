import React from 'react'
import CardWrapper from '@/components/auth/Card-Wrapper'
import { BsExclamationTriangleFill } from 'react-icons/bs'

const ErrorCard = () => {
  return (
    <CardWrapper
    headerLabel='Oops! Something went wrong'
    backButtonHref='/auth/login'
    backButtonLabel='Go back to login'
    >
        <div className=' w-full flex items-center justify-center'>
            <BsExclamationTriangleFill className='w-5 h-5 text-destructive' />
        </div>
    </CardWrapper>
  )
}

export default ErrorCard
