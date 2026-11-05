'use client';

import { useState } from 'react';
import Image from 'next/image';

export function BotaoSom() {
  const [somAtivo, setSomAtivo] = useState(true);

  const toggleSom = () => {
    setSomAtivo(!somAtivo);
  };

  return (
    <footer className="fixed bottom-7 right-7 z-50">
      <button
        onClick={toggleSom}
        className="flex h-[65px] w-[65px] items-center justify-center rounded-[16px] bg-[#6f8dca] shadow-md transition-transform active:scale-95 hover:bg-[#5b7ab7]"
        title={somAtivo ? 'Desativar Som' : 'Ativar Som'}
      >
        <Image
          src="/icons/som.svg"
          alt="Ativar/Desativar Som"
          width={45}
          height={45}
          priority
          className={`h-[45px] w-[45px] object-contain transition-opacity ${
            somAtivo ? 'opacity-100' : 'opacity-40'
          }`}
        />
      </button>
    </footer>
  );
}