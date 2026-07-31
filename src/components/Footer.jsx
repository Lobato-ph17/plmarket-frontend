import React from 'react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-900 bg-zinc-950 py-8 text-center text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} PLMARKET. Todos os direitos reservados.</p>
        <p className="text-zinc-600">Desenvolvido como projeto Full Stack.</p>
      </div>
    </footer>
  );
}