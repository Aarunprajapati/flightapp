import React from 'react'

interface CardHeaderProps {
    label: string
}
const Cardheader = ({
    label
}: CardHeaderProps) => {
  return (
    <div className='p-4 flex gap-y-4 flex-col items-center justify-between'>
      <h1 className='text-2xl font-semibold'>✈️ Flight App</h1>
      <p className=' text-muted-foreground text-sm'>
        {label}
      </p>
    </div>
  )
}

export default Cardheader
