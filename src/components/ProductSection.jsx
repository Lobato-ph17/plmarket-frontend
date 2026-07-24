import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export function ProductSection({ titulo, subtitulo, produtos, onEditar, onDeletar, onAdicionarAoCarrinho }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!produtos || produtos.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 tracking-tight">{titulo}</h3>
          {subtitulo && <p className="text-xs text-zinc-400 mt-1">{subtitulo}</p>}
        </div>

        {/* Botões do Carrossel */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-purple-500/50 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-purple-500/50 transition-all"
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista com Scroll Horizontal Suave */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {produtos.map(produto => (
          <div key={produto.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0">
            <ProductCard 
              produto={produto}
              onEditar={onEditar}
              onDeletar={onDeletar}
              onAdicionarAoCarrinho={onAdicionarAoCarrinho}
            />
          </div>
        ))}
      </div>
    </section>
  );
}