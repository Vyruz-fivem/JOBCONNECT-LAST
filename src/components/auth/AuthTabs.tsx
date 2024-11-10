import React from 'react';

interface AuthTabsProps {
  isLogin: boolean;
  onTabChange: (isLogin: boolean) => void;
}

export function AuthTabs({ isLogin, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex mb-6">
      <button
        className={`flex-1 py-2 text-center ${
          isLogin
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-gray-500'
        }`}
        onClick={() => onTabChange(true)}
      >
        Connexion
      </button>
      <button
        className={`flex-1 py-2 text-center ${
          !isLogin
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-gray-500'
        }`}
        onClick={() => onTabChange(false)}
      >
        Inscription
      </button>
    </div>
  );
}