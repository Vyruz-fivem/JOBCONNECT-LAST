import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { AuthTabs } from '../components/auth/AuthTabs';
import { AuthForm } from '../components/auth/AuthForm';
import type { AuthFormData } from '../types/auth';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Tous les champs sont requis');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      
      const success = register(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Cet email est déjà utilisé');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>

        <AuthTabs isLogin={isLogin} onTabChange={setIsLogin} />
        
        <AuthForm
          isLogin={isLogin}
          error={error}
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}