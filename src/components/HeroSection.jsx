import React from 'react';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-900 py-20 lg:py-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 mb-6 border border-purple-500/20">
          Nova Temporada 2026 <ChevronRight className="w-3.5 h-3.5" />
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 mb-6">
          Eleve o nível do seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Setup Técnico</span>
        </h2>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
          Uma curadoria exclusiva de periféricos e hardware de alta performance para desenvolvedores exigentes.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#catalogo" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            Explorar Catálogo
          </a>
        </div>
      </div>
    </section>
  );
}