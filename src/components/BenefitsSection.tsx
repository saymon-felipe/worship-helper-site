/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, Sun, Compass, Sparkles, CheckSquare, ShieldCheck, Zap 
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Mais Adoração, Menos Improviso",
      desc: "Quando a equipe sabe exatamente o que tocar, quando tocar e em qual tom, a ansiedade desaparece. O ensaio rende mais e o culto flui em adoração tranquila."
    },
    {
      icon: Sun,
      title: "Clareza Absoluta para o Músico",
      desc: "Cada instrumentista recebe sua escala diretamente no bolso. Sem surpresas: eles sabem sua função, quais canções estudar e qual o tom definitivo."
    },
    {
      icon: Compass,
      title: "Repertório Sempre Organizado",
      desc: "Chega de buscar cifras em sites cheios de anúncios na hora do culto. Todas as cifras da igreja ficam guardadas de forma limpa, profissional e acessível."
    },
    {
      icon: Sparkles,
      title: "Comunicação Centralizada",
      desc: "Esqueça as dezenas de mensagens no WhatsApp perguntando 'qual tom vamos cantar?'. As discussões sobre arranjos e dinâmicas acontecem dentro de cada música."
    },
    {
      icon: ShieldCheck,
      title: "Segurança e Ordem Pastoral",
      desc: "Como líder ou pastor, mantenha o controle litúrgico seguro. Defina quem pode gerenciar a lista oficial de músicas e escalações, blindando o ministério de ruídos."
    },
    {
      icon: Zap,
      title: "Economia Drástica de Tempo",
      desc: "Monte escalas mensais e setlists em minutos, poupando horas de ligações e mensagens manuais de confirmação. Mais tempo livre para pastorear sua equipe."
    }
  ];

  return (
    <section id="beneficios-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950/20 to-slate-950">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full">
            Impacto Real
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mt-4 tracking-tight">
            Os frutos de um ministério organizado
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            Uma liderança excelente gera frutos espirituais consistentes. Reduza a fadiga operacional da sua equipe técnica e musical.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={i}
                className="group relative p-6 rounded-2xl bg-slate-950/40 border border-slate-900 hover:border-cyan-500/30 transition-all duration-300 flex gap-4"
              >
                {/* Visual marker inside card */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-cyan-500/20 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 shrink-0 h-fit">
                  <Icon className="w-5 h-5" />
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Quote block */}
        <div className="mt-16 p-8 rounded-2xl border border-slate-800/80 bg-slate-950/60 max-w-3xl mx-auto text-center relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-cyan-400 font-mono uppercase tracking-wider">
            Conselho Pastoral
          </div>
          
          <p className="text-sm md:text-base text-slate-300 italic leading-relaxed mt-2">
            &ldquo;Organização não apaga a ação do Espírito Santo; pelo contrário, prepara o caminho para que possamos adorar sem distrações logísticas.&rdquo;
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-cyan-400">Pastor Luciano Cruz, Igreja Videira</span>
          </div>
        </div>

      </div>
    </section>
  );
}
