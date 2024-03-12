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

//* var 
const steps = [
  { title: 'Review your itinerary',  },
  { title: 'Add contact details', },
  { title: 'Add traveller details', description:'E-ticket will be sent to this email address and phone number' },
];

const BookPage = () => {
  //* states
  const [activeStep, setActiveStep] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState({})

  //* functions 
  const goprev = ()=>{
    const prevstep = currentStepIndex -1;
    if(prevstep >= 0){
      setCurrentStepIndex(prevstep);
    }
  }
  
  const gonext = (FormData:any) => {
    const newdata = {
      ...data,
      ...FormData
    }
    setCurrentStepIndex(currentStepIndex +1) 
    setData(newdata)
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  //* render components accordingly steps
  // const getStepContent = (step:any) => {
  //   switch (step) {
  //     case 0:
  //       return <BookReview/>;
  //     case 1:
  //       return <BookContact/>;
  //     case 2:
  //       return <BookTravelDeatils/>;
  //   }
  // };

  //* form submittion function

  // const handleSubmit = (e:any)=>{
  //   e.preventDefault()
  //   console.log(e.target.value)


  // }

  return (
    <div className="max-w-5xl mx-28 bg-white rounded-lg overflow-hidden">
      <div className="p-4">
        <Stepper index={currentStepIndex}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={index < currentStepIndex ? <StepIcon /> : undefined}
                  incomplete={index >= currentStepIndex ? <StepNumber /> : undefined}
                  active={index === currentStepIndex ? <StepNumber /> : undefined}
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


       
          <ControlledFlow currentIndex={currentStepIndex} onNext={gonext}>
            <BookReview gonext={gonext} goprev={() => {}}/>
            <BookContact gonext={gonext} goprev={() => {}}/>
            <BookTravelDeatils gonext={gonext} goprev={() => {}}/>
          </ControlledFlow>
          <div className="flex justify-between">
            {currentStepIndex > 0 && (
              <Button            
                className="text-light"
                colorScheme="orange"
                variant="solid"
                size="md"
                onClick={goprev}
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
              onClick={gonext}
            >
              {currentStepIndex === steps.length - 1 ? 'continoune & Payment' : 'Next'}
            </Button>
          </div>
      </div>
    </div>
  );
};

export default BookPage;



