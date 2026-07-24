import React from 'react';
import { Monitor, Mouse, Cpu, Sparkles } from 'lucide-react';

export function CategoryBar({ categoriaAtiva, setCategoriaAtiva }) {
  const categorias = [
    { id: 'Todos', nome: 'Tudo', icon: Sparkles },
    { id: 'Periféricos', nome: 'Periféricos', icon: Mouse },
    { id: 'Monitores', nome: 'Monitores', icon: Monitor },
    { id: 'Hardware', nome: 'Hardware', icon: Cpu },
  ];

  return (
    <div className="py-8 border-b border-zinc-900 mb-12">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Navegue por Categorias</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categorias.map(cat => {
          const Icon = cat.icon;
          const isSelected = categoriaAtiva === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                isSelected 
                  ? 'bg-purple-600/10 border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.15)]' 
                  : 'bg-zinc-900/50 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <div className={`p-3 rounded-xl mb-3 transition-colors ${
                isSelected ? 'bg-purple-600 text-white' : 'bg-zinc-950 text-zinc-400 group-hover:text-purple-400'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">{cat.nome}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}