"use client"
import { cn } from '../lib/utils'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'


interface SeacrhButtonProps {
    label:string,
    href?: string,
    className?:string,
    onClick?: () => void;
}
const CustomButton = ({label,href,className, onClick}: SeacrhButtonProps) => {
  return (
    <Link href={href || ""}>
      <Button onClick={onClick} className={cn("", className)}>{label}</Button>
    </Link>
  );
}
        
export default CustomButton
