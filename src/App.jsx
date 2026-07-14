import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/produtos')
      .then(response => {
        setProdutos(response.data); 
      })
      .catch(error => {
        console.error("Erro ao buscar produtos do backend:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Header Minimalista */}
      <header className="border-b border-zinc-800 py-6 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider text-purple-500">PLMARKET</h1>
        <span className="text-sm text-zinc-400">Premium Tech Store</span>
      </header>

      {/* Grid de Produtos */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-xl font-medium mb-8 border-l-2 border-purple-500 pl-3">Catálogo Exclusivo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produtos.map(produto => (
            <div key={produto.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between">
              <img 
                src={produto.imagemUrl} 
                alt={produto.nome} 
                className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-zinc-100 mb-2">{produto.nome}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{produto.descricao}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-purple-400">
                    R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors">
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;