'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [alerta, setAlerta] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlerta(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlerta({ texto: 'Login realizado com sucesso!', tipo: 'sucesso' });
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      } else {
        setAlerta({ texto: data.error || 'E-mail ou senha incorretos.', tipo: 'erro' });
      }
    } catch (err) {
      setAlerta({ texto: 'Erro de conexão com o servidor.', tipo: 'erro' });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#e5e4e4] font-sans">
      <main className="flex items-center justify-center gap-[12vw]">
        {/* Lado Esquerdo: Logo do Mundo Lógi */}
        <div className="logo-container">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Mundo Lógi Logo"
              width={320}
              height={190}
              priority
              className="w-[320px] max-w-full object-contain"
            />
          </Link>
        </div>

        {/* Lado Direito: Formulário e Ações */}
        <div className="flex w-[380px] flex-col items-center gap-[18px]">
          {/* Card Azul Claro */}
          <div className="flex w-full flex-col items-center rounded-[24px] bg-[#9eb9cc] p-[40px] shadow-sm">
            <h2 className="mb-[25px] text-[32px] font-bold text-black">Entrar</h2>

            {/* Componente de Alerta */}
            {alerta && (
              <div className="mb-4 w-full">
                <Alert tipo={alerta.tipo} mensagem={alerta.texto} />
              </div>
            )}

            <form id="form-login" onSubmit={handleSubmit} className="flex w-full flex-col gap-[18px]">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[14px] bg-[#c8d1d9] px-[20px] py-[14px] text-[16px] text-black outline-none placeholder:text-[#555]"
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full rounded-[14px] bg-[#c8d1d9] px-[20px] py-[14px] text-[16px] text-black outline-none placeholder:text-[#555]"
              />
            </form>
          </div>

          {/* Botão "Entrar" com tamanho reduzido idêntico ao protótipo */}
          <Button
            type="submit"
            form="form-login"
            className="w-[150px] py-[8px] text-[16px]"
          >
            Entrar
          </Button>

          {/* Link para criar conta */}
          <Link
            href="/register"
            className="text-[15px] font-semibold text-[#1d4ed8] underline hover:text-[#1e40af] transition-colors"
          >
            Não possui conta? Cadastrar
          </Link>
        </div>
      </main>
    </div>
  );
}