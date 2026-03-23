import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6 border-b border-[#C99B3D]/30">
        <h1 className="text-2xl font-bold tracking-widest text-[#C99B3D]">BARBEARIA PREMIUM</h1>
        <p className="text-sm text-gray-400 hidden sm:block">Itinga - Lauro de Freitas, BA</p>
      </header>

      <section className="flex flex-col items-center justify-center text-center px-4 py-32 bg-gradient-to-b from-black to-zinc-900">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
          Estilo não é opção,<br />
          <span className="text-[#C99B3D]">é padrão.</span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg">
          Mais de 10 anos de excelência. Viva a experiência Premium aqui no seu bairro.
        </p>
        
        <Link 
          href="/agendar" 
          className="bg-[#C99B3D] text-black font-bold py-4 px-8 rounded-md text-lg hover:bg-[#a67d2e] transition-colors uppercase tracking-wide"
        >
          Agendar meu Horário
        </Link>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border border-zinc-800 rounded-lg hover:border-[#C99B3D] transition-colors">
          <h3 className="text-xl font-bold text-[#C99B3D] mb-3">Corte & Degradê</h3>
          <p className="text-gray-400">O alinhamento perfeito para o seu visual.</p>
        </div>
        <div className="p-6 border border-zinc-800 rounded-lg hover:border-[#C99B3D] transition-colors">
          <h3 className="text-xl font-bold text-[#C99B3D] mb-3">Barboterapia</h3>
          <p className="text-gray-400">Toalha quente e acabamento impecável.</p>
        </div>
        <div className="p-6 border border-zinc-800 rounded-lg hover:border-[#C99B3D] transition-colors">
          <h3 className="text-xl font-bold text-[#C99B3D] mb-3">Platinado</h3>
          <p className="text-gray-400">Transformação com produtos de alta qualidade.</p>
        </div>
      </section>
    </main>
  );
}