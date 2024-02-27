import React from 'react'

const FlightLayout = (
    {children}
    :{children:React.ReactNode}) => {
  return (
    <div className='h-screen mx-auto w-full p-4'>
      {children}
    </div>
  )
}

export default FlightLayout
