import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PlusCircle, Search, User, Shield } from 'lucide-react';
import { useStore } from '../store';

export default function Navbar() {
  const { isAuthenticated, user } = useStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-emerald-600">JobConnect</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/tasks" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
              <Search className="w-5 h-5" />
              <span>Parcourir</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/create" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
                  <PlusCircle className="w-5 h-5" />
                  <span>Créer une annonce</span>
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
                    <Shield className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
                  <User className="w-5 h-5" />
                  <span>Profil</span>
                </Link>
              </>
            ) : (
              <Link to="/auth" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}