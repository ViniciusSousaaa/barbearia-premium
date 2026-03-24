"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Agendar() {
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("");
  const [dataHora, setDataHora] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      const dataDesejada = new Date(dataHora);
      const agora = new Date();

      if (dataDesejada < agora) {
        setErro("A máquina do tempo quebrou! 😅 Escolha um horário futuro.");
        setCarregando(false);
        return; 
      }

      const dataFormatada = dataDesejada.toISOString();

      const inicioJanela = new Date(dataDesejada.getTime() - 40 * 60000).toISOString();
      const fimJanela = new Date(dataDesejada.getTime() + 40 * 60000).toISOString();

      const { data: conflitos, error: erroBusca } = await supabase
        .from('agendamentos')
        .select('id')
        .gte('data_hora', inicioJanela) 
        .lte('data_hora', fimJanela); 

      if (erroBusca) throw erroBusca;

      if (conflitos && conflitos.length > 0) {
        setErro("Este horário está muito próximo de outro agendamento (intervalo de 40min).");
        setCarregando(false);
        return; 
      }

      const { error: erroInsert } = await supabase
        .from('agendamentos')
        .insert([
          { cliente_nome: nome, telefone: telefone, servico: servico, data_hora: dataFormatada }
        ]);

      if (erroInsert) throw erroInsert;

      setSucesso(true);
      setNome("");
      setTelefone("");
      setServico("");
      setDataHora("");

    } catch (err) {
      setErro("Falha no sistema. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-[#C99B3D] transition-colors mb-8 inline-block">
          &larr; Voltar para o Início
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#C99B3D] mb-2">Reserve seu Horário</h1>
        <p className="text-gray-400 mb-8">Preencha os dados abaixo para garantir sua vaga.</p>

        {sucesso ? (
          <div className="bg-green-900/30 border border-green-500 text-green-400 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Agendamento Confirmado!</h2>
            <p>Te esperamos na barbearia. Dúvidas? Chame no WhatsApp.</p>
            <button onClick={() => setSucesso(false)} className="mt-4 underline hover:text-white">
              Fazer novo agendamento
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            {erro && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-md text-sm text-center">
                {erro}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="text-sm font-medium text-gray-300">Seu Nome</label>
              <input type="text" id="nome" required 
                value={nome} onChange={(e) => setNome(e.target.value)}
                className="p-3 rounded bg-black border border-zinc-700 text-white focus:outline-none focus:border-[#C99B3D] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="telefone" className="text-sm font-medium text-gray-300">WhatsApp</label>
              <input type="tel" id="telefone" required 
                value={telefone} onChange={(e) => setTelefone(e.target.value)}
                className="p-3 rounded bg-black border border-zinc-700 text-white focus:outline-none focus:border-[#C99B3D] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="servico" className="text-sm font-medium text-gray-300">Serviço</label>
              <select id="servico" required 
                value={servico} onChange={(e) => setServico(e.target.value)}
                className="p-3 rounded bg-black border border-zinc-700 text-white focus:outline-none focus:border-[#C99B3D] transition-colors appearance-none">
                <option value="">Selecione...</option>
                <option value="Corte Clássico">Corte Clássico</option>
                <option value="Degradê">Degradê</option>
                <option value="Barboterapia">Barboterapia</option>
                <option value="Corte + Barba">Corte + Barba</option>
                <option value="Platinado">Platinado</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dataHora" className="text-sm font-medium text-gray-300">Data e Horário</label>
              <input type="datetime-local" id="dataHora" required 
                value={dataHora} onChange={(e) => setDataHora(e.target.value)}
                className="p-3 rounded bg-black border border-zinc-700 text-white focus:outline-none focus:border-[#C99B3D] transition-colors [color-scheme:dark]" />
            </div>

            <button 
              type="submit" 
              disabled={carregando}
              className="mt-4 w-full bg-[#C99B3D] text-black font-bold py-4 rounded-md text-lg hover:bg-[#a67d2e] transition-colors disabled:opacity-50"
            >
              {carregando ? "Processando..." : "Confirmar Agendamento"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}