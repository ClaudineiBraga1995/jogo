import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, senha, dataNascimento } = body;

    if (!dataNascimento) {
      return NextResponse.json(
        { error: 'A data de nascimento é obrigatória.' },
        { status: 400 }
      );
    }

    const dataFormatada = new Date(dataNascimento);
    const agora = new Date();

    // Data limite de 100 anos atrás
    const cemAnosAtras = new Date();
    cemAnosAtras.setFullYear(cemAnosAtras.getFullYear() - 100);

    // Validações de data
    if (isNaN(dataFormatada.getTime())) {
      return NextResponse.json(
        { error: 'Data de nascimento inválida.' },
        { status: 400 }
      );
    }

    if (dataFormatada > agora) {
      return NextResponse.json(
        { error: 'Data de nascimento não pode ser no futuro.' },
        { status: 400 }
      );
    }

    if (dataFormatada < cemAnosAtras) {
      return NextResponse.json(
        { error: 'Data de nascimento excede o limite permitido (100 anos).' },
        { status: 400 }
      );
    }

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        dataNasc: dataFormatada,
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