"use client"
import React from 'react'
import Flightdetail from './flight-detail'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'





const Fligtdetailsbtn = () => {
  return (
    <div>
       <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Flight details</AccordionTrigger>
    <AccordionContent>
    <Flightdetail/>
    </AccordionContent>
  </AccordionItem>
</Accordion>    
          
    
    </div>
  ) 
}

export default Fligtdetailsbtn
