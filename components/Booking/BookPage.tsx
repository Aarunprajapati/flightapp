"use client"
import React, { useState } from 'react';
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
import BookReview from './BookReview';
import BookContact from './BookContact';
import BookTravelDeatils from './BookTravelDeatils';

const steps = [
  { title: 'Review your itinerary',  },
  { title: 'Add contact details', },
  { title: 'Add traveller details', description:'E-ticket will be sent to this email address and phone number' },
];

const BookPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };
  const lastButton = ()=>{
    if(activeStep === steps.length - 1){
      return <Button colorScheme='orange'>Continoue & Payment</Button>
    } else {
      return <Button onClick={handleNext}>Next</Button>
    }
  }

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  const getStepContent = (step:any) => {
    switch (step) {
      case 0:
        return <BookReview />;
      case 1:
        return <BookContact/>;
      case 2:
        return <BookTravelDeatils/>;
    }
  };
  const handleSubmit = (e:any)=>{
    e.preventDefault()
    console.log(e.target.value)


  }

  return (
    <div className="max-w-5xl mx-28 bg-white rounded-lg overflow-hidden">
      <div className="p-4">
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={index < activeStep ? <StepIcon /> : undefined}
                  incomplete={index >= activeStep ? <StepNumber /> : undefined}
                  active={index === activeStep ? <StepNumber /> : undefined}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription className=' text-foreground'>{step.description}</StepDescription>
              </Box>
              {index < steps.length - 1 && <StepSeparator />}
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>

          <h1>{getStepContent(activeStep)}</h1>
          <div className="flex justify-between">
            {activeStep > 0 && (
              <Button
                
                className="text-light"
                colorScheme="orange"
                variant="solid"
                size="md"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            <Button
              type='submit'
              className="text-light"
              colorScheme="orange"
              variant="solid"
              size="md"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'continoune & Payment' : 'Next'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookPage;



