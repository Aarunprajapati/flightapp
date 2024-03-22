import { createContext, useContext, useState } from "react";

interface IFormData{
    id:string,
    email:string,
    firstName:string,
    lastName:string,
   
}
interface IFormContext {
    handleFormNext: () => void,
    handleFormBack: () => void,
    step:number,
    formData: IFormData,
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

const FormContext = createContext<IFormContext>({
    handleFormNext: () =>{},
    handleFormBack: () => {},
    step:1,
    formData:{
        id:"",
        email: '',
        firstName: '',
        lastName: '',
    },
    setFormData: ()=>{}

    
});

interface IProps{
    children: React.ReactNode
}



export const FormProvider = ({ children }: IProps) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<IFormData>({
        id:"",
        email: '',
        firstName: '',
        lastName: '',
      
    })
   

    const handleFormNext = ()=>{
        setStep(prevStep => prevStep + 1)
    }
    const handleFormBack = ()=>{
        setStep(prevStep => prevStep - 1)
    }
    console.log(formData)

    return (
    <FormContext.Provider value={{step, handleFormNext, handleFormBack, formData, setFormData}}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = ()=>{
    return useContext(FormContext)
}