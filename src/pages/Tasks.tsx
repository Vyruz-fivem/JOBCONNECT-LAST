import React, { useState } from 'react';
import { MapPin, Euro, Calendar } from 'lucide-react';
import { useStore } from '../store';
import type { Task } from '../types/task';

export default function Tasks() {
  const tasks = useStore(state => state.getTasks());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Rechercher une annonce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Toutes les catégories</option>
          <option value="Jardinage">Jardinage</option>
          <option value="Bricolage">Bricolage</option>
          <option value="Ménage">Ménage</option>
          <option value="Courses">Courses</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                {task.category}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{task.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {task.location}
              </div>
              <div className="flex items-center">
                <Euro className="w-4 h-4 mr-1" />
                {task.budget}€
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(task.date)}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Publié par {task.authorName}
              </span>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Proposer mes services
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}