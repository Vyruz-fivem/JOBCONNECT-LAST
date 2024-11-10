import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Trash2, Shield, ShieldOff } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const { user, users, tasks, deleteUser, deleteTask, toggleAdmin } = useStore();

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Panel Administrateur</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Gestion des Utilisateurs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">ID</th>
                <th className="text-left py-3">Nom</th>
                <th className="text-left py-3">Email</th>
                <th className="text-left py-3">Admin</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b">
                  <td className="py-3">{u.id}</td>
                  <td className="py-3">{u.name}</td>
                  <td className="py-3">{u.email}</td>
                  <td className="py-3">
                    {u.isAdmin ? (
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm">
                        Admin
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                        Utilisateur
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleAdmin(u.id)}
                        className="p-2 text-gray-600 hover:text-emerald-600"
                        title={u.isAdmin ? "Retirer les droits admin" : "Donner les droits admin"}
                      >
                        {u.isAdmin ? <ShieldOff size={20} /> : <Shield size={20} />}
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="p-2 text-gray-600 hover:text-red-600"
                        title="Supprimer l'utilisateur"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Gestion des Tâches</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">ID</th>
                <th className="text-left py-3">Titre</th>
                <th className="text-left py-3">Auteur</th>
                <th className="text-left py-3">Statut</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-b">
                  <td className="py-3">{task.id}</td>
                  <td className="py-3">{task.title}</td>
                  <td className="py-3">{task.authorName}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      task.status === 'open' 
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-600 hover:text-red-600"
                      title="Supprimer la tâche"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}