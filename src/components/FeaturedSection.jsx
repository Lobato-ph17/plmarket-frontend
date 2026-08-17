import React from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

export function FeaturedSection({ produtos, onAdicionarAoCarrinho }) {
  if (!produtos || produtos.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Mais Cobiçados para o Setup</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">Os produtos mais buscados da semana com condições especiais</p>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-purple-900/40 scrollbar-track-zinc-900/50">
        {produtos.slice(0, 5).map((produto) => (
          <div 
            key={`destaque-${produto.id}`}
            className="group relative min-w-[280px] md:min-w-[340px] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-500/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] flex flex-col justify-between"
          >
            <div className="absolute top-3 left-3 z-10 bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
              🔥 Em Destaque
            </div>

            <div className="relative h-44 overflow-hidden bg-zinc-950">
              <img 
                src={produto.imagemUrl || FALLBACK_IMAGE} 
                alt={produto.nome}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-widest">{produto.categoria || 'Gamer'}</span>
                <h3 className="text-base font-bold text-white line-clamp-1 mt-0.5 group-hover:text-purple-300 transition-colors">
                  {produto.nome}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-normal">
                  {produto.descricao}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-medium">A partir de</span>
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
        ))}
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-10" />
    </section>
  );
}