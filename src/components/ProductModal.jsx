import React from 'react';
import { PackagePlus, X } from 'lucide-react';

export function ProductModal({ modalAberta, setModalAberta, produtoEmEdicaoId, formProduto, setFormProduto, handleSalvarProduto }) {
  if (!modalAberta) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModalAberta(false)}></div>

      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl z-10">
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-6">
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <PackagePlus className="w-5 h-5 text-purple-500" /> 
            {produtoEmEdicaoId ? 'Editar Produto' : 'Cadastrar Novo Produto'}
          </h3>
          <button onClick={() => setModalAberta(false)} className="text-zinc-400 hover:text-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSalvarProduto} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Nome do Produto</label>
            <input 
              type="text" required
              value={formProduto.nome}
              onChange={e => setFormProduto({...formProduto, nome: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-purple-500"
              placeholder="Ex: Teclado Keychron K2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Preço (R$)</label>
              <input 
                type="number" step="0.01" required
                value={formProduto.preco}
                onChange={e => setFormProduto({...formProduto, preco: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-purple-500"
                placeholder="599.90"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Categoria</label>
              <select 
                value={formProduto.categoria}
                onChange={e => setFormProduto({...formProduto, categoria: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-purple-500"
              >
                <option value="Periféricos">Periféricos</option>
                <option value="Monitores">Monitores</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">URL da Imagem</label>
            <input 
              type="url" required
              value={formProduto.imagemUrl}
              onChange={e => setFormProduto({...formProduto, imagemUrl: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-purple-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Descrição</label>
            <textarea 
              rows="3" required
              value={formProduto.descricao}
              onChange={e => setFormProduto({...formProduto, descricao: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-purple-500 resize-none"
              placeholder="Detalhes técnicos sobre o produto..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button 
              type="button" 
              onClick={() => setModalAberta(false)}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all"
            >
              {produtoEmEdicaoId ? 'Atualizar Produto' : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}