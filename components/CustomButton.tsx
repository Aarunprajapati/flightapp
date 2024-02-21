import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface SeacrhButtonProps {
    label:string,
    href?: string,
    className?:string
}
const CustomButton = ({label,href,className}: SeacrhButtonProps) => {
  return (
    <Link href={'#'}>
    <button className={cn('', className)}>{label}</button>
    </Link>
  )
}

export default CustomButton
