"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Agendamento {
  id: string;
  cliente_nome: string;
  servico: string;
  telefone: string;
  data_hora: string;
}

export default function PainelAdmin() {
  const [lista, setLista] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*')
        .order('data_hora', { ascending: true });

      if (error) console.error("Erro na busca:", error);
      else setLista(data || []);
      setCarregando(false);
    }

    carregarDados();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold text-[#C99B3D]">Painel da Barbearia</h1>
          <Link href="/" className="text-sm text-gray-400 hover:text-white">Ver Site</Link>
        </div>

        {carregando ? (
          <p className="text-gray-400 text-center">Carregando agenda...</p>
        ) : lista.length === 0 ? (
          <p className="text-gray-400 bg-zinc-900 p-6 rounded-lg text-center">Nenhum agendamento para mostrar.</p>
        ) : (
          <div className="grid gap-4">
            {lista.map((item) => {
              const dataFormatada = new Date(item.data_hora).toLocaleString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              });

              return (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-[#C99B3D] transition-colors">
                  <div>
                    <h2 className="text-xl font-bold text-white">{item.cliente_nome}</h2>
                    <p className="text-[#C99B3D] font-medium">{item.servico}</p>
                    <p className="text-sm text-gray-400 mt-1">Contato: {item.telefone}</p>
                  </div>
                  <div className="bg-black px-4 py-2 rounded border border-zinc-800 text-center">
                    <p className="text-sm text-gray-400">Horário</p>
                    <p className="font-bold text-lg">{dataFormatada}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}