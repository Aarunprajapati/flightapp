import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

interface SeacrhButtonProps {
    label:string,
    href?: string,
}
const CustomButton = ({label,href}: SeacrhButtonProps) => {
  return (
    
    <Button className=' py-[22px]' size={'sm'} type="submit">{label}</Button>

  )
}

export default CustomButton
