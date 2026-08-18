import React, { useState } from 'react';
import { Lock, Mail, X, ShieldCheck } from 'lucide-react';

export function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Credenciais de teste simples para demonstração
    if (email === 'admin@plmarket.com' && senha === 'admin123') {
      onLoginSuccess();
      setErro('');
      onClose();
    } else {
      setErro('Credenciais inválidas. Use admin@plmarket.com / admin123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-900 border border-purple-500/30 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Acesso Administrativo</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {erro && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium">
              {erro}
            </div>
          )}

          <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl text-xs text-purple-300">
            💡 <strong>Credenciais de Demonstração:</strong><br />
            E-mail: <code className="text-white">admin@plmarket.com</code><br />
            Senha: <code className="text-white">admin123</code>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@plmarket.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-purple-500/25 active:scale-95 cursor-pointer"
          >
            Entrar como Admin
          </button>
        </form>
      </div>
    </div>
  );
}