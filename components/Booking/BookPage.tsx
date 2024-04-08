"use client"
import React, { useState } from 'react';
import {FormProvider, useFormContext} from '@/components/Booking/context/formcontext'
import FormContent from './FormContent';

//* var 
const steps = [
  { title: 'Review your itinerary',  },
  { title: 'Add contact details', },
  { title: 'Add traveller details', description:'E-ticket will be sent to this email address and phone number' },
];

const BookPage = () => {
 
  return (
    <>    
    <div className="mx-28 bg-white rounded-lg overflow-hidden">
      <div className="p-4">
         <FormProvider>
            <FormContent/>
          </FormProvider>
      </div>
    </div>
    </>
  );
};

export default BookPage;



