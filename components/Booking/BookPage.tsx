"use client"// Add semicolon at the end of the statement

import React, { useEffect, useState } from 'react';
import BookReview from './BookReview';
import BookContact from './BookContact';
 // Correct the import statement

import { useSteps, Stepper, Step, StepIndicator, StepNumber, StepTitle, StepDescription, Button } from '@chakra-ui/react';
import BookTravelDeatils from './BookTravelDeatils';

type FormData = {
  travelDetails: any;
  contactInfo: any;
  review: any;
  id: any | null; 
};

const BookPage: React.FC = () => {
  const steps = [
    { title: 'Travel Details' },
    { title: 'Contact Information' },
    { title: 'Review' },
  ];

  const [formData, setFormData] = useState<FormData>({
    travelDetails: {},
    contactInfo: {},
    review: {},
    id: null, 
  });

  const { activeStep, setActiveStep } = useSteps({});

  useEffect(() => {
    setActiveStep(0); 
  }, []);

  const handleNext = (data: any, id: any | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: id, 
    }));
    console.log('ID in formData:', id); 
    setActiveStep((prevStep) => prevStep + 1); 
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    setFormData({
      travelDetails: {},
      contactInfo: {},
      review: {},
      id: null, 
    });
    setActiveStep(0); 
  };

  const getStepComponent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <BookReview onNext={(data) => handleNext(data, formData.id)} />;
      case 1:
        return <BookContact onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return  <BookTravelDeatils formData={formData} onNext={(data) => handleNext(data, formData.id)} onPrev={handlePrev} />;
        
      default:
        return null;
    }
  };

  return (
    <>
      <Stepper index={activeStep}>
        <StepIndicator>
          {[1, 2, 3].map((stepNumber) => (
            <StepNumber key={stepNumber}>{stepNumber}</StepNumber>
          ))}
        </StepIndicator>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{getStepComponent(index)}</StepDescription>
          </Step>
        ))}
      </Stepper>

      <div style={{ marginTop: '20px' }}>
        {activeStep !== 0 && (
          <Button onClick={handlePrev} disabled={activeStep === 0}>
            Previous
          </Button>
        )}
        {activeStep !== steps.length - 1 ? (
          <Button onClick={() => handleNext({}, null)} disabled={false}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={false}>
            Submit
          </Button>
        )}
      </div>
    </>
  );
};

export default BookPage;