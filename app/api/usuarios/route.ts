import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, senha, dataNasc } = body;

    const novoUsuario = await prisma.usuario.create({
      data: { 
        nome, 
        email, 
        senha,
        dataNasc: new Date(dataNasc) // Converte a string YYYY-MM-DD para objeto Date
      },
    });

    return NextResponse.json(novoUsuario, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 });
  }
}