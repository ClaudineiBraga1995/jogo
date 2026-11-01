'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegistrePage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nome, 
        email, 
        senha,
        dataNascimento // Envia a data selecionada
      }),
    });

    if (res.ok) {
      alert('Usuário cadastrado com sucesso!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Criar Conta</h1>
        <Input label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input 
          label="Data de Nascimento" 
          type="date" 
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