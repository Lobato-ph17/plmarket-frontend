import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  ShoppingBag, 
  Search, 
  User, 
  ChevronRight, 
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');
  
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos do backend:", error);
      });
  }, []);

  // Categorias do e-commerce
  const categorias = ['Todos', 'Periféricos', 'Monitores', 'Hardware'];

  const obterCategoriaDoProduto = (produto) => {
    const nome = produto.nome.toLowerCase();
    if (nome.includes('teclado') || nome.includes('mouse')) return 'Periféricos';
    if (nome.includes('monitor')) return 'Monitores';
    return 'Hardware';
  };

  // Lógica de Filtragem (Busca + Categoria)
  const produtosFiltrados = produtos.filter(produto => {
    const matchesBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const categoriaDoProduto = obterCategoriaDoProduto(produto);
    const matchesCategoria = categoriaAtiva === 'Todos' || categoriaDoProduto === categoriaAtiva;
    return matchesBusca && matchesCategoria;
  });

  // Funções do Carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prev => {
      const itemExistente = prev.find(item => item.id === produto.id);
      if (itemExistente) {
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
    setCarrinhoAberto(true);
  };

  const alterarQuantidade = (id, alteracao) => {
    setCarrinho(prev => 
      prev.map(item => {
        if (item.id === id) {
          const novaQtd = item.quantidade + alteracao;
          return novaQtd > 0 ? { ...item, quantidade: novaQtd } : item;
        }
        return item;
      })
    );
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  // Cálculos do Carrinho
  const totalItensNoCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotalCarrinho = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* NAVBAR FIXA */}
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

          <div className="flex items-center gap-4">
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

      {/* HERO SECTION */}
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

      {/* SEÇÃO DO CATÁLOGO */}
      <main id="catalogo" className="max-w-7xl mx-auto py-16 px-6 scroll-mt-20">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-zinc-900 pb-8">
          <div>
            <h3 className="text-2xl font-semibold text-zinc-100">Nosso Catálogo</h3>
            <p className="text-zinc-400 text-sm mt-1">Selecione produtos de alta performance integrados à nossa API.</p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-zinc-500 text-sm mr-2 hidden lg:flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4" /> Filtrar por:
            </span>
            {categorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => setCategoriaAtiva(categoria)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${
                  categoriaAtiva === categoria 
                    ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_12px_rgba(147,51,234,0.2)]' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map(produto => (
              <div 
                key={produto.id} 
                className="group bg-zinc-900/40 border border-zinc-900 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={produto.imagemUrl} 
                    alt={produto.nome} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md text-purple-400">
                    {obterCategoriaDoProduto(produto)}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-lg text-zinc-100 group-hover:text-purple-400 transition-colors duration-300 mb-2">
                      {produto.nome}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {produto.descricao}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-900">
                    <span className="text-xl font-bold text-zinc-100">
                      R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <button 
                      onClick={() => adicionarAoCarrinho(produto)}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">Nenhum produto encontrado.</p>
          </div>
        )}
      </main>

      <div className={`fixed inset-0 z-50 transition-visibility duration-300 ${carrinhoAberto ? 'visible' : 'invisible'}`}>
      
        <div 
          onClick={() => setCarrinhoAberto(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${carrinhoAberto ? 'opacity-100' : 'opacity-0'}`}
        ></div>

        {/* Painel do Carrinho */}
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-zinc-800 flex flex-col justify-between shadow-2xl transition-transform duration-300 transform ${carrinhoAberto ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Topo do Carrinho */}
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

          {/* Lista de Itens */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6">
            {carrinho.length > 0 ? (
              carrinho.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-zinc-800/50 pb-4 last:border-0 last:pb-0">
                  <img src={item.imagemUrl} alt={item.nome} className="w-20 h-20 object-cover rounded-lg bg-zinc-950 border border-zinc-800" />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100 line-clamp-1">{item.nome}</h4>
                      <p className="text-xs text-purple-400 mt-1">
                        R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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

          {/* Rodapé do Carrinho (Resumo Financeiro) */}
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
                onClick={() => alert("Compra simulada com sucesso!")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] cursor-pointer"
              >
                Finalizar Pedido
              </button>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold tracking-widest text-zinc-300">PLMARKET</h4>
            <p className="text-xs text-zinc-500 mt-1">© 2026 PLMARKET. Desenvolvido para fins de portfólio.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" aria-label="GitHub" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.0.082-.0.082.906.105 1.79 1.05 1.79 1.18 1.947 1.83 1.532 2.147 1.17.118-.808.443-1.343.801-1.652-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;