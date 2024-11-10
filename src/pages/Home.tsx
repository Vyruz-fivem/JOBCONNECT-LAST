import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, DollarSign } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Trouvez de l'aide pour vos tâches quotidiennes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          JobConnect connecte les personnes ayant besoin d'aide avec ceux qui peuvent les aider, de manière simple et sécurisée.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/create" className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
            Publier une annonce
          </Link>
          <Link to="/tasks" className="bg-white text-emerald-600 px-6 py-3 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50">
            Parcourir les annonces
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <Search className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Publiez votre besoin</h3>
          <p className="text-gray-600">Décrivez votre tâche et fixez votre budget</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <MessageSquare className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Discutez directement</h3>
          <p className="text-gray-600">Échangez avec les prestataires intéressés</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <DollarSign className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
          <p className="text-gray-600">Payez uniquement une fois satisfait</p>
        </div>
      </section>

      <section className="bg-emerald-50 -mx-4 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Les services les plus demandés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Jardinage', 'Bricolage', 'Ménage', 'Courses', 'Déménagement', 'Peinture', 'Garde d\'animaux', 'Informatique'].map((service) => (
              <div key={service} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}