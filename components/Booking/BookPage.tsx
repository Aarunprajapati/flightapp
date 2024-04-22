"use client"
import React, { useState } from 'react';
import {FormProvider, useFormContext} from '@/components/Booking/context/formcontext'
import FormContent from './FormContent';


const BookPage = () => {
  return (
    <>    
    <div className="lg:mx-28 bg-white rounded-lg overflow-hidden">
      <div className="lg:p-4">
         <FormProvider>
            <FormContent/>
          </FormProvider>
      </div>
    </div>
    </>
  );
};

export default BookPage;



