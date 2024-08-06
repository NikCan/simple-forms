import React, { createContext, useContext } from 'react';

export interface FormData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: 'man' | 'women' | 'empty';
  workPlace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
}

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  resetFormData: () => void;
}

export const initialFormData: FormData = {
  phone: '',
  firstName: '',
  lastName: '',
  gender: 'empty',
  workPlace: 'empty',
  address: '',
  loanAmount: 200,
  loanTerm: 10,
};

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
