import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between animate-pulse">
      {/* Imagem Placeholder */}
      <div className="w-full h-48 bg-zinc-800/60 rounded-xl mb-4"></div>

      {/* Conteúdo */}
      <div className="space-y-3">
        {/* Categoria */}
        <div className="w-20 h-3 bg-zinc-800/80 rounded"></div>
        
        {/* Título */}
        <div className="w-3/4 h-5 bg-zinc-800 rounded"></div>
        
        {/* Descrição - 2 linhas */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-3 bg-zinc-800/50 rounded"></div>
          <div className="w-2/3 h-3 bg-zinc-800/50 rounded"></div>
        </div>

        {/* Preço e Botão */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-4">
          <div className="w-24 h-6 bg-zinc-800 rounded"></div>
          <div className="w-10 h-10 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}