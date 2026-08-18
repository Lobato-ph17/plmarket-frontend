import React from 'react';
import { Search, PackagePlus, User, ShoppingBag, LogOut, ShieldCheck } from 'lucide-react';

export function Header({ 
  busca, 
  setBusca, 
  handleAbrirModalNovo, 
  setCarrinhoAberto, 
  totalItensNoCarrinho,
  isAdmin,
  onOpenLogin,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO & NAVEGAÇÃO */}
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-widest text-purple-500 cursor-pointer hover:text-purple-400 transition-colors">
            PLMARKET
          </h1>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="text-zinc-100 hover:text-purple-400 transition-colors">Home</a>
            <a href="#catalogo" className="hover:text-purple-400 transition-colors">Catálogo</a>
          </nav>
        </div>

        {/* BARRA DE BUSCA */}
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

        {/* AÇÕES (ADMIN & CARRINHO) */}
        <div className="flex items-center gap-3">
          
          {isAdmin ? (
            <>
              <div className="hidden lg:flex items-center gap-1.5 bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin</span>
              </div>

              <button 
                onClick={handleAbrirModalNovo}
                className="flex items-center gap-2 bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600 hover:text-white text-purple-300 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                title="Cadastrar Novo Produto"
              >
                <PackagePlus className="w-4 h-4" />
                <span className="hidden md:inline">Novo Produto</span>
              </button>

              <button 
                onClick={onLogout}
                className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-500/20 transition-all rounded-xl cursor-pointer"
                title="Sair do Modo Administrador"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="p-2 text-zinc-400 hover:text-purple-300 bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/40 rounded-xl transition-all duration-300 cursor-pointer"
              title="Área Administrativa (Login)"
            >
              <User className="w-5 h-5" />
            </button>
          )}
          {/* BOTÃO DO CARRINHO DE COMPRAS */}
          <button 
            onClick={() => setCarrinhoAberto(true)}
            className="p-2 text-zinc-400 hover:text-purple-400 transition-colors rounded-full hover:bg-zinc-900 relative cursor-pointer"
            title="Abrir Carrinho"
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