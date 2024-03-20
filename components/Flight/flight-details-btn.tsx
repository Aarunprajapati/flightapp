"use client"
import React, { useState } from 'react'
import Flightdetail from './flight-detail'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

interface DetailButtonProps {
  onClick?: () => void;
}
// this is the button in the flight data component that show the flight details 
const Fligtdetailsbtn = ({ onClick}: DetailButtonProps) => {
  return (
    <div>
       <Accordion type="single" collapsible>
       <AccordionItem value="item-1">
    <AccordionTrigger onClick={onClick}>Flight details</AccordionTrigger>
    <AccordionContent>
    <Flightdetail />
    </AccordionContent>
  </AccordionItem>
</Accordion>        
    </div>
  ) 
}

export default Fligtdetailsbtn
