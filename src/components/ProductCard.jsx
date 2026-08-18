import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

export function ProductCard({ produto, onEditar, onDeletar, onAdicionarAoCarrinho, isAdmin }) {
  return (
    <div className="group bg-zinc-900/90 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)] flex flex-col justify-between">
      
      <div className="relative h-48 overflow-hidden bg-zinc-950">
        {/* BADGE DE CATEGORIA */}
        <span className="absolute top-3 left-3 z-10 bg-zinc-900/90 backdrop-blur-md text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {produto.categoria || 'Gamer'}
        </span>

        {/* BOTÕES DE AÇÃO (EDITAR / DELETAR) - APENAS SE FOR ADMIN */}
        {isAdmin && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={() => onEditar(produto)}
              className="p-1.5 bg-zinc-900/90 hover:bg-purple-600 text-zinc-300 hover:text-white rounded-lg backdrop-blur-md border border-zinc-700/50 transition-all cursor-pointer"
              title="Editar produto"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => onDeletar(produto.id)}
              className="p-1.5 bg-zinc-900/90 hover:bg-rose-600 text-zinc-300 hover:text-white rounded-lg backdrop-blur-md border border-zinc-700/50 transition-all cursor-pointer"
              title="Excluir produto"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* IMAGEM COM TRATAMENTO DE ERRO (FALLBACK) */}
        <img 
          src={produto.imagemUrl || FALLBACK_IMAGE} 
          alt={produto.nome}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
            {produto.nome}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 font-normal leading-relaxed">
            {produto.descricao}
          </p>
        </div>

        <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/80">
          <div>
            <span className="text-lg font-extrabold text-white">
              R$ {produto.preco?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <button 
            onClick={() => onAdicionarAoCarrinho(produto)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl transition-all shadow-md hover:shadow-purple-500/30 active:scale-95 cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}