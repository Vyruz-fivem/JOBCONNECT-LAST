import React, { useState } from 'react';
import { useStore } from '../store';
import { Settings, MessageSquare, Clock, Star, Edit2, X } from 'lucide-react';
import type { Task, CreateTaskData } from '../types/task';

interface EditingTask {
  id: string;
  data: CreateTaskData;
}

export default function Profile() {
  const { user, logout } = useStore();
  const tasks = useStore(state => state.getTasks());
  const updateTask = useStore(state => state.updateTask);
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);

  if (!user) {
    return null;
  }

  const userTasks = tasks.filter(task => task.authorId === user.id);
  const openTasks = userTasks.filter(task => task.status === 'open');
  const activeTasks = userTasks.filter(task => task.status === 'in_progress');
  const completedTasks = userTasks.filter(task => task.status === 'completed');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditStart = (task: Task) => {
    const { id, title, description, budget, location, category, date } = task;
    setEditingTask({
      id,
      data: { title, description, budget, location, category, date }
    });
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  const handleEditSave = () => {
    if (editingTask) {
      updateTask(editingTask.id, editingTask.data);
      setEditingTask(null);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editingTask) return;

    const { name, value } = e.target;
    setEditingTask({
      ...editingTask,
      data: {
        ...editingTask.data,
        [name]: name === 'budget' ? parseFloat(value) || 0 : value,
      }
    });
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const isEditing = editingTask?.id === task.id;

    if (isEditing) {
      return (
        <div className="border-b pb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={editingTask.data.title}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={editingTask.data.description}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (€)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={editingTask.data.budget}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  name="location"
                  value={editingTask.data.location}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={editingTask.data.category}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Jardinage">Jardinage</option>
                  <option value="Bricolage">Bricolage</option>
                  <option value="Ménage">Ménage</option>
                  <option value="Courses">Courses</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={editingTask.data.date}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleEditCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={task.id} className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <div className="flex gap-4 mt-1 text-sm text-gray-500">
              <span>{task.location}</span>
              <span>{task.budget}€</span>
              <span>{formatDate(task.date)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {task.status === 'open' && (
              <button
                onClick={() => handleEditStart(task)}
                className="p-2 text-gray-600 hover:text-emerald-600"
                title="Modifier l'annonce"
              >
                <Edit2 size={20} />
              </button>
            )}
            <span className={`px-3 py-1 rounded-full text-sm ${
              task.status === 'open' 
                ? 'bg-emerald-100 text-emerald-800'
                : task.status === 'in_progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {task.status === 'open' ? 'Ouverte' : task.status === 'in_progress' ? 'En cours' : 'Terminée'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-600">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="text-gray-600 hover:text-gray-800"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 p-4 rounded-lg">
            <MessageSquare className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
            <div className="font-semibold">{openTasks.length}</div>
            <div className="text-sm text-gray-600">Annonces ouvertes</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
            <div className="font-semibold">{activeTasks.length}</div>
            <div className="text-sm text-gray-600">Tâches en cours</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <Star className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
            <div className="font-semibold">{completedTasks.length}</div>
            <div className="text-sm text-gray-600">Tâches terminées</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Mes annonces ouvertes</h2>
        <div className="space-y-4">
          {openTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune annonce ouverte</p>
          ) : (
            openTasks.map(task => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Mes tâches en cours</h2>
        <div className="space-y-4">
          {activeTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune tâche en cours</p>
          ) : (
            activeTasks.map(task => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Historique des tâches terminées</h2>
        <div className="space-y-4">
          {completedTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune tâche terminée</p>
          ) : (
            completedTasks.map(task => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
}