"use client"
import React, { useState } from 'react'
import Flightdetail from './flight-detail'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'


// this is the button in the flight data component that show the flight details 
const Fligtdetailsbtn = () => {
  return (
    <div>
       <Accordion type="single" collapsible>
       <AccordionItem value="item-1">
    <AccordionTrigger>Flight details</AccordionTrigger>
    <AccordionContent>
    <Flightdetail />
    </AccordionContent>
  </AccordionItem>
</Accordion>        
    </div>
  ) 
}

export default Fligtdetailsbtn
