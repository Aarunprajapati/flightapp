import { createContext, useContext, useState } from "react";
import instance from "@/axiosinstance";

interface IMember {
  firstName: string;
  lastName: string;
  gender: string;

  nationality: string;
}

interface IFormData {
  id: string;
  fare: string;
  code: {
    dial_code: string;
  };
  phone: string;

  email: string;

  members: IMember[];
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
    code: {
      dial_code: "",
    },
    phone: "",

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
  const [formData, setFormData] = useState<IFormData>({
    id: "",
    fare: "",
    code: {
      dial_code: "",
    },
    phone: "",

    email: "",

    members: [],
  });

  const onSubmit = async (formData: IFormData) => {
    try {
      console.log("Submitting form data:", formData);
      const res = await instance.post("/booking", formData);
      const response = res.data.url;
      window.location.href = response;
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleFormNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleFormBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

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
