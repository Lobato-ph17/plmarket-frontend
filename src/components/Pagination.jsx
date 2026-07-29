import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ paginaAtual, totalPaginas, onPaginaChange }) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-12 pt-6 border-t border-zinc-900">
      <button
        onClick={() => onPaginaChange(paginaAtual - 1)}
        disabled={paginaAtual === 0}
        className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <span className="text-xs font-medium text-zinc-400 px-2">
        Página <strong className="text-zinc-100">{paginaAtual + 1}</strong> de <strong className="text-zinc-100">{totalPaginas}</strong>
      </span>

      <button
        onClick={() => onPaginaChange(paginaAtual + 1)}
        disabled={paginaAtual >= totalPaginas - 1}
        className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Próxima
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}