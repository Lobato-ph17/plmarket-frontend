import React from 'react';
import { Search, PackagePlus, User, ShoppingBag } from 'lucide-react';

export function Header({ 
  busca, 
  setBusca, 
  handleAbrirModalNovo, 
  setCarrinhoAberto, 
  totalItensNoCarrinho 
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-widest text-purple-500 cursor-pointer hover:text-purple-400 transition-colors">
            PLMARKET
          </h1>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="text-zinc-100 hover:text-purple-400 transition-colors">Home</a>
            <a href="#catalogo" className="hover:text-purple-400 transition-colors">Catálogo</a>
          </nav>
        </div>

        <div className="flex-1 max-w-md relative hidden sm:block">
          <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text" 
            placeholder="Buscar produtos premium..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-1.5 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleAbrirModalNovo}
            className="flex items-center gap-2 bg-purple-600/10 border border-purple-500/30 hover:bg-purple-600 hover:text-white text-purple-400 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer"
          >
            <PackagePlus className="w-4 h-4" />
            <span className="hidden md:inline">Novo Produto</span>
          </button>

          <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-900">
            <User className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCarrinhoAberto(true)}
            className="p-2 text-zinc-400 hover:text-purple-400 transition-colors rounded-full hover:bg-zinc-900 relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItensNoCarrinho > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-zinc-950 animate-pulse">
                {totalItensNoCarrinho}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}