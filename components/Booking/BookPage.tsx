"use client"
import React, { useState } from 'react';

//* custome components 
import BookReview from './BookReview';
import BookContact from './BookContact';
import BookTravelDeatils from './BookTravelDeatils';

//* chakra ui 
import {
  Box,
  Button,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react';
import { ControlledFlow } from './ControlledFlow';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import {FormProvider, useFormContext} from '@/components/Booking/context/formcontext'
import FormContent from './FormContent';

//* var 
const steps = [
  { title: 'Review your itinerary',  },
  { title: 'Add contact details', },
  { title: 'Add traveller details', description:'E-ticket will be sent to this email address and phone number' },
];

const BookPage = () => {
  const {step, handleFormBack, handleFormNext} = useFormContext();
  console.log(step)
 
  const handlenext = ()=>{
    handleFormNext();
  }


  return (
    <>    
    <div className="max-w-5xl mx-28 bg-white rounded-lg overflow-hidden">
      <div className="p-4">
        {/* <Stepper index={step}>
          {steps.map((stepcontent, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={index < step ? <StepIcon /> : undefined}
                  incomplete={index >= step ? <StepNumber /> : undefined}
                  active={index === step ? <StepNumber /> : undefined}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{stepcontent.title}</StepTitle>
                <StepDescription className=' text-foreground'>{stepcontent.description}</StepDescription>
              </Box>
              {index < steps.length - 1 && <StepSeparator />}
            </Step>
          ))}
        </Stepper> */}

       <FormProvider>
       <Stepper index={step}>
      {steps.map((stepcontent, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={index < step ? <StepIcon /> : undefined}
              incomplete={index >= step ? <StepNumber /> : undefined}
              active={index === step ? <StepNumber /> : undefined}
            />
          </StepIndicator>
          <Box flexShrink="0">
            <StepTitle>{stepcontent.title}</StepTitle>
            <StepDescription className=' text-foreground'>{stepcontent.description}</StepDescription>
          </Box>
          {index < steps.length - 1 && <StepSeparator />}
        </Step>
      ))}
    </Stepper> 
       
            <FormContent/>
       </FormProvider>
        
 
          <div className="flex justify-between">
          
             

            <Button
              type='button'
              className="text-light"
              colorScheme="orange"
              variant="solid"
              size="md"
              
            >
              prev
             
            </Button>
            <Button            
                className="text-light"
                colorScheme="orange"
                variant="solid"
                size="md"
               onClick={()=>handlenext()}
                
              >
                next
              </Button>
          </div>
      </div>
    </div>
    </>
  );
};

export default BookPage;



