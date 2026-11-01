import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Bem-vindo ao Jogo</h1>
      <p className="text-lg text-gray-600 mb-8">Escolha uma opção para continuar:</p>
      
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Ir para Login
        </Link>
        <Link 
          href="/registre" 
          className="rounded-md border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Criar Conta
        </Link>
      </div>
    </main>
  );
}