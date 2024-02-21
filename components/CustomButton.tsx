import Link from 'next/link'
import React from 'react'

interface SeacrhButtonProps {
    label:string,
    href?: string,
}
const CustomButton = ({label,href}: SeacrhButtonProps) => {
  return (
    <Link href={'#'}>
    <button className='px-6 py-2 rounded-md text-md bg-black text-white'>{label}</button>
    </Link>
  )
}

export default CustomButton
