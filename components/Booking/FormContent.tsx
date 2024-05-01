"use client";
import React, { useEffect, useState } from "react";
import { useFormContext } from "./context/formcontext";
import BookContact from "./BookContact";
import BookTravelDetails from "./BookTravelDeatils";
import BookReview from "./BookReview";
import { Loader2 } from "lucide-react";
// Material UI
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { StepContent, useMediaQuery, useTheme } from "@mui/material";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Review your itinerary" },
  { title: "Add contact details" },
  {
    title: "Add traveller details",
    description: "E-ticket will be sent to this email address and phone number",
  },
];

const FormContent = () => {
  const { step } = useFormContext();
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="text-lg flex justify-center font-bold text-blue-500"><Loader2 className={cn("h-12 my-2 w-12  text-primary/60 animate-spin text-blue-700")}/></div>;
  }

  const renderSteps = () => (
    <>
      {isSmallScreen ? (
        // Show only this Box on small screens
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={step} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepContent>
                  <StepLabel>{step.title}</StepLabel>
                  <Typography>{RenderFormContent()}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      ) : (
        // Show only this Box on large screens
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={step}>
            {steps.map((step, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={step.title} {...stepProps}>
                  <StepLabel {...labelProps}>{step.title}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {step === steps.length ? (
            ""
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {RenderFormContent()}
              </Typography>
            </React.Fragment>
          )}
        </Box>
      )}
    </>
  );

  const RenderFormContent = () => {
    switch (step) {
      case 0:
        return <BookReview />;
      case 1:
        return <BookContact />;
      case 2:
        return <BookTravelDetails />;
      default:
        return "Thank you for booking with us!";
    }
  };

  return <>{renderSteps()}</>;
};

export default FormContent;
