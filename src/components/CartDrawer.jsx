import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function CartDrawer({ 
  carrinhoAberto, 
  setCarrinhoAberto, 
  carrinho, 
  setCarrinho, 
  alterarQuantidade, 
  removerDoCarrinho, 
  valorTotalCarrinho 
}) {
  return (
    <div className={`fixed inset-0 z-50 transition-visibility duration-300 ${carrinhoAberto ? 'visible' : 'invisible'}`}>
      <div 
        onClick={() => setCarrinhoAberto(false)}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${carrinhoAberto ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-zinc-800 flex flex-col justify-between shadow-2xl transition-transform duration-300 transform ${carrinhoAberto ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-500" />
            <h3 className="font-bold text-lg text-zinc-100">Seu Carrinho</h3>
          </div>
          <button 
            onClick={() => setCarrinhoAberto(false)}
            className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {carrinho.length > 0 ? (
            carrinho.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-zinc-800/50 pb-4 last:border-0 last:pb-0">
                <img src={item.imagemUrl} alt={item.nome} className="w-20 h-20 object-cover rounded-lg bg-zinc-950 border border-zinc-800" />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-100 line-clamp-1">{item.nome}</h4>
                    <p className="text-xs text-purple-400 mt-1">
                      R$ {item.preco ? item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800">
                      <button 
                        onClick={() => alterarQuantidade(item.id, -1)}
                        className="text-zinc-400 hover:text-zinc-100 p-0.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-semibold px-1 text-zinc-200">{item.quantidade}</span>
                      <button 
                        onClick={() => alterarQuantidade(item.id, 1)}
                        className="text-zinc-400 hover:text-zinc-100 p-0.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removerDoCarrinho(item.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-700" />
              <p>Seu carrinho está vazio.</p>
              <button 
                onClick={() => setCarrinhoAberto(false)}
                className="text-sm text-purple-400 hover:text-purple-300 font-semibold"
              >
                Continuar comprando
              </button>
            </div>
          )}
        </div>

        {carrinho.length > 0 && (
          <div className="p-6 border-t border-zinc-800 bg-zinc-950/50">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Subtotal</span>
                <span>R$ {valorTotalCarrinho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Frete</span>
                <span className="text-emerald-400 font-semibold">Grátis</span>
              </div>
              <div className="border-t border-zinc-800/80 my-2"></div>
              <div className="flex justify-between text-base font-bold text-zinc-100">
                <span>Total</span>
                <span className="text-purple-400">R$ {valorTotalCarrinho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                toast.success("Pedido realizado com sucesso!");
                setCarrinho([]);
                setCarrinhoAberto(false);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] cursor-pointer"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}