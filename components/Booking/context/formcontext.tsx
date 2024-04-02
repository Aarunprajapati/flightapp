import { createContext, useContext, useState } from "react";
import  instance from "@/axiosinstance"
interface IFormData{
    id:string,
    email:string,
    firstName:string,
    lastName:string,
   
}
interface IFormContext {
    onSubmit: (data:any) => void,
    handleFormNext: () => void,
    handleFormBack: () => void,
    step:number,
    setStep:React.Dispatch<React.SetStateAction<number>>
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
    setFormData: ()=>{},
    setStep: ()=>{},
    onSubmit:()=>{}
    
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
   
    const onSubmit = async(formData:any)=>{
        console.log( " resp before booking data",formData)
        const res = await instance.post('/booking', formData) 
    }
    const handleFormNext = ()=>{
        
        setStep(prevStep => prevStep + 1)
    }
    const handleFormBack = ()=>{
        setStep(prevStep => prevStep - 1)
    }
    console.log(formData,"formData for booking ")

    return (
    <FormContext.Provider value={{step,setStep, handleFormNext, handleFormBack, formData, setFormData, onSubmit}}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = ()=>{
    return useContext(FormContext)
}