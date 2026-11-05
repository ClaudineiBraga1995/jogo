import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#e5e4e4] font-sans">
      {/* Header Menu (Canto Superior Direito) */}
      <header className="absolute top-5 right-7 z-10 flex gap-5">
        <button
          id="btn-config"
          className="rounded-[12px] bg-[#6f8dca] px-6 py-2.5 text-base font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#5b7ab7]"
        >
          Configuração
        </button>
        <Link
          href="/login"
          className="rounded-[12px] bg-[#6f8dca] px-6 py-2.5 text-base font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#5b7ab7]"
        >
          Entrar
        </Link>
      </header>

      {/* Conteúdo Central */}
      <main className="mt-10 flex flex-1 items-center justify-center gap-[15vw]">
        {/* Coluna Esquerda: Logo e Botão Jogar */}
        <div className="flex flex-col items-center gap-[60px]">
          <Image
            src="/images/logo.png"
            alt="Mundo Lógi Logo"
            width={300}
            height={180}
            priority
            className="w-[300px] max-w-full object-contain"
          />
          <Link
            href="/jogar"
            className="flex w-[250px] items-center justify-center rounded-[12px] bg-[#6f8dca] py-3.5 text-[22px] font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-[#5b7ab7]"
          >
            Jogar
          </Link>
        </div>

        {/* Coluna Direita: Imagem Ilustrativa dos Pilares */}
        <div className="coluna-dir">
          <Image
            src="/images/img_ilustrativa.png"
            alt="Pilares do Pensamento Computacional"
            width={450}
            height={400}
            priority
            className="w-[450px] max-w-full object-contain"
          />
        </div>
      </main>
    </div>
  );
}