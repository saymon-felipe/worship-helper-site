/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Building2, UserPlus, ShieldAlert, Music4, CalendarDays, Megaphone, ArrowRight 
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: Building2,
      title: "Cadastre sua Igreja",
      desc: "Crie a conta da sua comunidade em 2 minutos. Defina o nome e configure as preferências iniciais do seu ministério."
    },
    {
      num: "02",
      icon: UserPlus,
      title: "Convide sua Equipe",
      desc: "Envie links rápidos de convite para cantores, músicos e técnicos de som. Eles preenchem seus próprios perfis rapidamente."
    },
    {
      num: "03",
      icon: ShieldAlert,
      title: "Defina Permissões",
      desc: "Crie cargos específicos (ex: Pastores, Líderes, Instrumentistas) regulando quem pode cadastrar músicas ou alterar eventos."
    },
    {
      num: "04",
      icon: Music4,
      title: "Suba o Repertório",
      desc: "Cadastre as músicas da igreja com vídeos do YouTube, links e as cifras transponíveis prontas para uso imediato."
    },
    {
      num: "05",
      icon: CalendarDays,
      title: "Monte os Eventos",
      desc: "Agende cultos e ensaios, adicione a escala de músicos, defina o setlist exato e escolha os tons que serão tocados."
    },
    {
      num: "06",
      icon: Megaphone,
      title: "Comunique e Louve",
      desc: "Publique avisos no mural, troque ideias nos comentários de cada música e foque na adoração com tudo 100% alinhado."
    }
  ];

  return (
    <section id="como-funciona-section" className="py-20 relative overflow-hidden bg-slate-950/40">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full">
            Fluxo de Sucesso
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mt-4 tracking-tight">
            Seu ministério organizado em poucos passos
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            Uma transição simples e acolhedora do caos do WhatsApp para o profissionalismo que a adoração merece.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900/80 hover:border-slate-800 transition-all duration-300 group hover:bg-slate-950/40 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-cyan-500/20 font-mono group-hover:text-cyan-400/40 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white font-display">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow or connection hint */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex justify-end mt-4 text-slate-700 group-hover:text-cyan-400/30 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
