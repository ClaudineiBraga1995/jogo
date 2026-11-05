import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#e5e4e4] font-sans">

      <header className="absolute top-5 right-7 z-10 flex gap-5">

        <Button id="btn-config" className="px-6 py-2.5 text-base">
          Configuração
        </Button>

        <Link href="/login">
          <Button id="btn-entrar" className="px-6 py-2.5 text-base">
            Entrar
          </Button>
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
         <Link href="/jogar">
          <Button id="btn-jogar" className="w-[250px] py-[12px] text-[22px]">
            Jogar
          </Button>
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