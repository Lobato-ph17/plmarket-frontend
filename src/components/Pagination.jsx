import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ paginaAtual, totalPaginas, onPaginaChange }) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="mt-14 flex items-center justify-center gap-6">
      {/* BOTÃO ANTERIOR */}
      <button
        onClick={() => onPaginaChange(paginaAtual - 1)}
        disabled={paginaAtual === 0}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 text-xs font-semibold hover:border-purple-500/60 hover:text-white hover:bg-purple-950/30 disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:bg-zinc-900/80 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] active:scale-95"
      >
        <ChevronLeft className="w-4 h-4" /> Anterior
      </button>

      {/* INDICADOR DE PÁGINA */}
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl shadow-inner">
        <span className="text-xs text-zinc-400 font-medium">Página</span>
        <span className="px-2.5 py-0.5 bg-purple-600/30 border border-purple-500/40 text-purple-300 font-extrabold text-sm rounded-lg shadow-[0_0_10px_rgba(168,85,247,0.2)]">
          {paginaAtual + 1}
        </span>
        <span className="text-xs text-zinc-500 font-medium">de</span>
        <span className="text-xs text-zinc-300 font-bold">{totalPaginas}</span>
      </div>

      {/* BOTÃO PRÓXIMA */}
      <button
        onClick={() => onPaginaChange(paginaAtual + 1)}
        disabled={paginaAtual + 1 >= totalPaginas}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 text-xs font-semibold hover:border-purple-500/60 hover:text-white hover:bg-purple-950/30 disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:bg-zinc-900/80 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] active:scale-95"
      >
        Próxima <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}