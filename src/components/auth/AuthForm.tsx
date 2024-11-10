import React from 'react';
import { AuthFormProps } from '../../types/auth';

export function AuthForm({
  isLogin,
  error,
  formData,
  onSubmit,
  onChange,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required={!isLogin}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          required
          minLength={6}
        />
        {!isLogin && (
          <p className="text-sm text-gray-500 mt-1">
            Le mot de passe doit contenir au moins 6 caractères
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
      >
        {isLogin ? 'Se connecter' : "S'inscrire"}
      </button>
    </form>
  );
}