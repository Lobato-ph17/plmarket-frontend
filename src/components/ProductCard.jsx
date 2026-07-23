import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export function ProductCard({ produto, onEditar, onDeletar, onAdicionarAoCarrinho }) {
  return (
    <div className="group bg-zinc-900/40 border border-zinc-900 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={produto.imagemUrl || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=600&auto=format&fit=crop'} 
          alt={produto.nome} 
          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
        <span className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md text-purple-400">
          {produto.categoria || 'Geral'}
        </span>

        {/* AÇÕES (Editar e Deletar) */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => onEditar(produto)}
            className="p-2 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-lg text-zinc-400 hover:text-purple-400 transition-colors"
            title="Editar produto"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDeletar(produto.id)}
            className="p-2 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
            title="Excluir produto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h4 className="font-semibold text-lg text-zinc-100 group-hover:text-purple-400 transition-colors duration-300 mb-2">
            {produto.nome}
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {produto.descricao}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-900">
          <span className="text-xl font-bold text-zinc-100">
            R$ {produto.preco ? produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
          </span>
          <button 
            onClick={() => onAdicionarAoCarrinho(produto)}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}