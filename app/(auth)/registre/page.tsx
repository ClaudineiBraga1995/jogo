'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function RegistrePage() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  // Controla o tipo do input de data (muda para 'date' ao focar para exibir o calendário)
  const [inputType, setInputType] = useState<'text' | 'date'>('text');

  // Limites de data para evitar instabilidade na pré-renderização
  const [hoje, setHoje] = useState<string>('');
  const [minData, setMinData] = useState<string>('');

  const [alerta, setAlerta] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

  useEffect(() => {
    const dataAtual = new Date();
    setHoje(dataAtual.toISOString().split('T')[0]);

    const dataMin = new Date();
    dataMin.setFullYear(dataMin.getFullYear() - 100);
    setMinData(dataMin.toISOString().split('T')[0]);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlerta(null);

    if (senha !== confirmarSenha) {
      setAlerta({ texto: 'As senhas não coincidem!', tipo: 'erro' });
      return;
    }

    const dataSelecionada = new Date(dataNascimento);
    const agora = new Date();
    const dataMinima = new Date();
    dataMinima.setFullYear(dataMinima.getFullYear() - 100);

    if (dataSelecionada > agora) {
      setAlerta({ texto: 'A data de nascimento não pode ser no futuro!', tipo: 'erro' });
      return;
    }

    if (dataSelecionada < dataMinima) {
      setAlerta({ texto: 'Por favor, insira uma data de nascimento válida (máximo 100 anos).', tipo: 'erro' });
      return;
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome, 
          email, 
          senha,
          dataNascimento 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlerta({ texto: 'Cadastro realizado com sucesso! Redirecionando...', tipo: 'sucesso' });
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        setAlerta({ texto: data.error || 'Erro ao cadastrar usuário.', tipo: 'erro' });
      }
    } catch (err) {
      setAlerta({ texto: 'Erro de conexão com o servidor.', tipo: 'erro' });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e5e4e4] font-sans p-4">
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
          <div className="flex w-full flex-col items-center rounded-[24px] bg-[#9eb9cc] p-[35px] shadow-sm">
            <h2 className="mb-[20px] text-[32px] font-bold text-black">Criar Conta</h2>

            {/* Componente de Alerta de Erro/Sucesso */}
            {alerta && (
              <div className="mb-4 w-full">
                <Alert tipo={alerta.tipo} mensagem={alerta.texto} />
              </div>
            )}

            <form id="form-cadastro" onSubmit={handleRegister} className="flex w-full flex-col gap-[14px]">
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full rounded-[14px] bg-[#c8d1d9] px-[20px] py-[12px] text-[16px] text-black outline-none placeholder:text-[#555]"
              />

              <input
                type={inputType}
                placeholder="Data de Nascimento"
                value={dataNascimento}
                min={minData}
                max={hoje}
                onFocus={() => setInputType('date')}
                onBlur={() => {
                  if (!dataNascimento) setInputType('text');
                }}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
                className="w-full rounded-[14px] bg-[#c8d1d9] px-[20px] py-[12px] text-[16px] text-black outline-none placeholder:text-[#555]"
              />

              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[14px] bg-[#c8d1d9] px-[20px] py-[12px] text-[16px] text-black outline-none placeholder:text-[#555]"
              />

              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full rounded-[14px] bg-[#c8d1d9] px-[20px] py-[12px] text-[16px] text-black outline-none placeholder:text-[#555]"
              />

              <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className="w-full rounded-[14px] bg-[#c8d1d9] px-[20px] py-[12px] text-[16px] text-black outline-none placeholder:text-[#555]"
              />
            </form>
          </div>

          {/* Botão "Cadastrar" usando o componente <Button> com largura compacta */}
          <Button
            type="submit"
            form="form-cadastro"
            className="w-[160px] py-[8px] text-[16px]"
          >
            Cadastrar
          </Button>

          {/* Link para voltar ao Login */}
          <Link
            href="/login"
            className="text-[15px] font-semibold text-[#1d4ed8] underline hover:text-[#1e40af] transition-colors"
          >
            Já tem conta? Entrar
          </Link>
        </div>
      </main>
    </div>
  );
}