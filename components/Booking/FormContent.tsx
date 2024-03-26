"use client"
import React from 'react';
import { useFormContext } from './context/formcontext';
import BookContact from './BookContact';
import BookTravelDeatils from './BookTravelDeatils';
import BookReview from './BookReview';

import {
  Box,
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

const steps = [
  { title: 'Review your itinerary' },
  { title: 'Add contact details' },
  { title: 'Add traveller details', description: 'E-ticket will be sent to this email address and phone number' },
];

const FormContent = () => {
  const { step } = useFormContext(); 

  const renderSteps = () => (
    <Stepper index={step-1}> 
      {steps.map((stepContent, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={index < step-1 ? <StepIcon /> : undefined}
              incomplete={index >= step-1 ? <StepNumber>{index + 1}</StepNumber> : undefined}
              active={index === step-1 ? <StepNumber>{index + 1}</StepNumber> : undefined}
            />
          </StepIndicator>
          <Box flexShrink="0">
            <StepTitle>{stepContent.title}</StepTitle>
            {stepContent.description && <StepDescription>{stepContent.description}</StepDescription>}
          </Box>
          {index < steps.length - 1 && <StepSeparator />}
        </Step>
      ))}
    </Stepper>
  );

  
  const FormContent = () => {
    switch (step) {
      case 1:
        return <BookReview />;
      case 2:
        return <BookContact />;
      case 3:
        return <BookTravelDeatils/>;
      default:
        return null; 
    }
  };

  return (
    <>
      {renderSteps()}
      {FormContent()}
    </>
  );
};

export default FormContent;
