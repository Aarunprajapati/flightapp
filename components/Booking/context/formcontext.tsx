import { createContext, useContext, useState } from "react";
import instance from "@/axiosinstance";

interface IMemberData {
  firstName: string;
  lastName: string;
  Gender: string;
}
interface IFormData {
  id: string;
  fare: string;
  email: string;
  members: IMemberData[];
}

interface IFormContext {
  onSubmit: (formData: IFormData) => void;
  handleFormNext: () => void;
  handleFormBack: () => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const FormContext = createContext<IFormContext>({
  handleFormNext: () => {},
  handleFormBack: () => {},
  step: 1,
  formData: {
    id: "",
    fare: "",
    email: "",
    members: [],
  },

  setFormData: () => {},
  setStep: () => {},
  onSubmit: () => {},
});

interface IProps {
  children: React.ReactNode;
}

export const FormProvider = ({ children }: IProps) => {
    const [step, setStep] = useState(1);
    const[url, seturl] = useState(null)
    const [formData, setFormData] = useState<IFormData>({
        id:"",
        fare:"",
        email: '',
       members:[]
      
    })
   console.log(formData, "formData")
    const onSubmit = async(formData:any)=>{  
        const res = await instance.post('/booking', formData)
        const response = res.data.url
        window.location.href = response
    }
    const handleFormNext = ()=>{
        setStep(prevStep => prevStep + 1)
    }
    const handleFormBack = ()=>{
        setStep(prevStep => prevStep - 1)
    }
   




  

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        handleFormNext,
        handleFormBack,
        formData,
        setFormData,
        onSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
