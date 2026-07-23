import React, { useEffect, useState } from 'react';
import { produtoService } from './services/produtoService';
import { ProductModal } from './components/ProductModal';
import { ProductCard } from './components/ProductCard'; // Import do novo componente isolado
import { 
  ShoppingBag, Search, User, ChevronRight, SlidersHorizontal, 
  X, Plus, Minus, Trash2, PackagePlus 
} from 'lucide-react';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');
  
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const [modalAberta, setModalAberta] = useState(false);
  const [produtoEmEdicaoId, setProdutoEmEdicaoId] = useState(null);
  const [formProduto, setFormProduto] = useState({
    nome: '', descricao: '', preco: '', imagemUrl: '', categoria: 'Periféricos'
  });

  const carregarProdutos = async () => {
    try {
      const data = await produtoService.listarTodos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const categorias = ['Todos', 'Periféricos', 'Monitores', 'Hardware'];

  const handleAbrirModalNovo = () => {
    setProdutoEmEdicaoId(null);
    setFormProduto({ nome: '', descricao: '', preco: '', imagemUrl: '', categoria: 'Periféricos' });
    setModalAberta(true);
  };

  const handleAbrirModalEditar = (produto) => {
    setProdutoEmEdicaoId(produto.id);
    setFormProduto({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl,
      categoria: produto.categoria || 'Periféricos'
    });
    setModalAberta(true);
  };

  // Lógica de Deletar Produto
  const handleDeletarProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await produtoService.deletar(id);
        setProdutos(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  };

  const handleSalvarProduto = async (e) => {
    e.preventDefault();
    const dadosEnvio = { ...formProduto, preco: parseFloat(formProduto.preco) };

    try {
      if (produtoEmEdicaoId) {
        const produtoAtualizado = await produtoService.atualizar(produtoEmEdicaoId, dadosEnvio);
        setProdutos(prev => prev.map(p => p.id === produtoEmEdicaoId ? produtoAtualizado : p));
      } else {
        const novo = await produtoService.criar(dadosEnvio);
        setProdutos(prev => [...prev, novo]);
      }
      setModalAberta(false);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const produtosFiltrados = produtos.filter(produto => {
    const matchesBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const matchesCategoria = categoriaAtiva === 'Todos' || produto.categoria === categoriaAtiva;
    return matchesBusca && matchesCategoria;
  });

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

  const totalItensNoCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotalCarrinho = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* NAVBAR */}
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

      {/* CATÁLOGO (AQUI MUDOU) */}
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

        {/* Em vez de dezenas de linhas de HTML aqui dentro, chamamos o componente <ProductCard /> */}
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map(produto => (
              <ProductCard 
                key={produto.id}
                produto={produto}
                onEditar={handleAbrirModalEditar}
                onDeletar={handleDeletarProduto}
                onAdicionarAoCarrinho={adicionarAoCarrinho}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">Nenhum produto encontrado.</p>
          </div>
        )}
      </main>

      {/* COMPONENTE DA MODAL */}
      <ProductModal 
        modalAberta={modalAberta}
        setModalAberta={setModalAberta}
        produtoEmEdicaoId={produtoEmEdicaoId}
        formProduto={formProduto}
        setFormProduto={setFormProduto}
        handleSalvarProduto={handleSalvarProduto}
      />

      {/* PAINEL LATERAL DO CARRINHO */}
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
        </div>
      </footer>

    </div>
  );
}

export default App;