import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Desestrutura o que vem do formulário (o input chama-se dataNascimento)
    const { nome, email, senha, dataNascimento } = body;

    if (!dataNascimento) {
      return NextResponse.json(
        { error: 'A data de nascimento é obrigatória.' },
        { status: 400 }
      );
    }

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        // Conecta o valor do formulário à propriedade exata do Prisma (dataNasc)
        dataNasc: new Date(dataNascimento), 
      },
    });

    return NextResponse.json(novoUsuario, { status: 201 });
  } catch (error: any) {
    console.error('Erro no Prisma:', error);

    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Este e-mail já está em uso.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno ao criar usuário' },
      { status: 500 }
    );
  }
}