import { ChangeEvent, FormEvent } from 'react';

export interface AuthFormData {
  email: string;
  password: string;
  name: string;
}

export interface AuthFormProps {
  isLogin: boolean;
  error: string;
  formData: AuthFormData;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}