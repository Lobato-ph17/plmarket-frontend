import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { produtoService } from './services/produtoService';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryBar } from './components/CategoryBar';
import { ProductSection } from './components/ProductSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { ConfirmModal } from './components/ConfirmModal';
import { SlidersHorizontal } from 'lucide-react';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('padrao'); 
  
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('@plmarket:carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [vistosRecently, setVistosRecently] = useState([]);

  // Estados dos Modais
  const [modalAberta, setModalAberta] = useState(false);
  const [produtoEmEdicaoId, setProdutoEmEdicaoId] = useState(null);
  const [formProduto, setFormProduto] = useState({
    nome: '', descricao: '', preco: '', imagemUrl: '', categoria: 'Periféricos'
  });

  // Estados do Modal de Confirmação de Deleção
  const [confirmModalAberto, setConfirmModalAberto] = useState(false);
  const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);

  useEffect(() => {
    localStorage.setItem('@plmarket:carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const carregarProdutos = async () => {
    try {
      const data = await produtoService.listarTodos();
      setProdutos(data);
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

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

  const handleSolicitarDeletar = (id) => {
    setProdutoParaDeletar(id);
    setConfirmModalAberto(true);
  };

  const handleConfirmarDeletar = async () => {
    if (!produtoParaDeletar) return;

    try {
      await produtoService.deletar(produtoParaDeletar);
      setProdutos(prev => prev.filter(p => p.id !== produtoParaDeletar));
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      toast.error("Não foi possível excluir o produto.");
    } finally {
      setConfirmModalAberto(false);
      setProdutoParaDeletar(null);
    }
  };

  const handleSalvarProduto = async (e) => {
    e.preventDefault();
    const dadosEnvio = { ...formProduto, preco: parseFloat(formProduto.preco) };

    try {
      if (produtoEmEdicaoId) {
        const produtoAtualizado = await produtoService.atualizar(produtoEmEdicaoId, dadosEnvio);
        setProdutos(prev => prev.map(p => p.id === produtoEmEdicaoId ? produtoAtualizado : p));
        toast.success("Produto atualizado com sucesso!");
      } else {
        const novo = await produtoService.criar(dadosEnvio);
        setProdutos(prev => [...prev, novo]);
        toast.success("Produto cadastrado com sucesso!");
      }
      setModalAberta(false);
    } catch (error) {
      toast.error("Erro ao salvar o produto.");
    }
  };


  const produtosFiltrados = produtos
    .filter(produto => {
      const matchesBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
      const matchesCategoria = categoriaAtiva === 'Todos' || produto.categoria === categoriaAtiva;
      return matchesBusca && matchesCategoria;
    })
    .sort((a, b) => {
      if (ordenacao === 'menor-preco') return a.preco - b.preco;
      if (ordenacao === 'maior-preco') return b.preco - a.preco;
      if (ordenacao === 'nome') return a.nome.localeCompare(b.nome);
      return 0;
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
    
    setVistosRecently(prev => {
      if (!prev.some(p => p.id === produto.id)) {
        return [produto, ...prev].slice(0, 6);
      }
      return prev;
    });

    toast.success(`${produto.nome} adicionado ao carrinho!`);
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
    toast.info("Item removido do carrinho.");
  };

  const totalItensNoCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotalCarrinho = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200">
      
      <Toaster position="bottom-right" theme="dark" richColors />

      <Header 
        busca={busca} 
        setBusca={setBusca} 
        handleAbrirModalNovo={handleAbrirModalNovo} 
        setCarrinhoAberto={setCarrinhoAberto} 
        totalItensNoCarrinho={totalItensNoCarrinho} 
      />

      <HeroSection />

      <main id="catalogo" className="max-w-7xl mx-auto py-12 px-6 scroll-mt-20">
        <CategoryBar 
          categoriaAtiva={categoriaAtiva} 
          setCategoriaAtiva={setCategoriaAtiva} 
        />

        {vistosRecently.length > 0 && (
          <ProductSection 
            titulo="Relacionados aos itens que você interagiu"
            subtitulo="Com base nas suas escolhas recentes"
            produtos={vistosRecently}
            onEditar={handleAbrirModalEditar}
            onDeletar={handleSolicitarDeletar}
            onAdicionarAoCarrinho={adicionarAoCarrinho}
          />
        )}

        <ProductSection 
          titulo="Mais Cobiçados para o Setup"
          subtitulo="Os produtos mais buscados da semana"
          produtos={produtos.slice(0, 5)}
          onEditar={handleAbrirModalEditar}
          onDeletar={handleSolicitarDeletar}
          onAdicionarAoCarrinho={adicionarAoCarrinho}
        />

        {/* CABEÇALHO DO CATÁLOGO PRINCIPAL COM ORDENAÇÃO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-zinc-900 pb-6 pt-6">
          <div>
            <h3 className="text-2xl font-semibold text-zinc-100">Todos os Produtos</h3>
            <p className="text-zinc-400 text-sm mt-1">Exibindo {produtosFiltrados.length} itens no catálogo.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-xs flex items-center gap-1 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Ordenar por:
            </span>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="padrao">Destaques</option>
              <option value="menor-preco">Menor Preço</option>
              <option value="maior-preco">Maior Preço</option>
              <option value="nome">Nome (A-Z)</option>
            </select>
          </div>
        </div>

        {/* GRID PRINCIPAL */}
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map(produto => (
              <ProductCard 
                key={produto.id}
                produto={produto}
                onEditar={handleAbrirModalEditar}
                onDeletar={handleSolicitarDeletar}
                onAdicionarAoCarrinho={adicionarAoCarrinho}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">Nenhum produto encontrado para este filtro.</p>
          </div>
        )}
      </main>

      <ProductModal 
        modalAberta={modalAberta}
        setModalAberta={setModalAberta}
        produtoEmEdicaoId={produtoEmEdicaoId}
        formProduto={formProduto}
        setFormProduto={setFormProduto}
        handleSalvarProduto={handleSalvarProduto}
      />

      <ConfirmModal 
        isOpen={confirmModalAberto}
        onClose={() => setConfirmModalAberto(false)}
        onConfirm={handleConfirmarDeletar}
        titulo="Excluir Produto"
        mensagem="Tem certeza que deseja remover este produto do catálogo? Esta ação não poderá ser desfeita."
      />

      <CartDrawer 
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
        carrinho={carrinho}
        setCarrinho={setCarrinho}
        alterarQuantidade={alterarQuantidade}
        removerDoCarrinho={removerDoCarrinho}
        valorTotalCarrinho={valorTotalCarrinho}
      />

      <Footer />

    </div>
  );
}

export default App;