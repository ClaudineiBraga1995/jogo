'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

export default function RegistrePage() {
  const router = useRouter();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  // Estados para as datas limites (para evitar instabilidade na pré-renderização)
  const [hoje, setHoje] = useState<string>('');
  const [minData, setMinData] = useState<string>('');

  const [alerta, setAlerta] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

  // Define os limites de data apenas quando o componente monta no navegador
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleRegister} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Criar Conta</h1>
        
        {alerta && <Alert tipo={alerta.tipo} mensagem={alerta.texto} />}

        <Input label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input 
          label="Data de Nascimento" 
          type="date" 
          min={minData} // Atualizado com estado seguro
          max={hoje}    // Atualizado com estado seguro
          value={dataNascimento} 
          onChange={(e) => setDataNascimento(e.target.value)} 
          required 
        />
        <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <Input label="Confirmar Senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
        
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}