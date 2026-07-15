/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Calendar, Music, Sliders, MessageSquare, Users, 
  Tag, UserPlus, Bell, Shield, Lock, Check, ChevronRight
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Gestão de Eventos e Cultos",
      desc: "Agende cultos, ensaios regulares ou reuniões especiais. Centralize datas, locais e todas as diretrizes de preparação em um único painel.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Music,
      title: "Repertório Inteligente",
      desc: "Cadastre canções anexando vídeos, letras e links externos. Tenha uma verdadeira biblioteca de louvores com busca rápida por título ou artista.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Sliders,
      title: "Transposição de Tons",
      desc: "Salve e persista o tom ideal para cada vocal direto no evento. O sistema permite transpor cifras e visualizar o acorde ideal instantaneamente.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: MessageSquare,
      title: "Comentários Separados",
      desc: "O único app com chat duplo: faça comentários gerais sobre a música (arranjos, guias) ou observações específicas apenas para aquele culto.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Escalas de Louvor",
      desc: "Aloque ministros, guitarristas, tecladistas e equipe de som. Cada voluntário visualiza sua função e confirma presença facilmente.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Tag,
      title: "Tags de Usuários",
      desc: "Classifique membros do ministério por especialidade (ex: Soprano, Violonista, Técnico de PA) para agilizar escalações inteligentes.",
      color: "from-rose-500 to-orange-500"
    },
    {
      icon: UserPlus,
      title: "Convites para Novos Membros",
      desc: "Adicione músicos de maneira simples e rápida enviando um link de cadastro seguro. Eles se integram na hora sem burocracia.",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Bell,
      title: "Avisos Gerais",
      desc: "Um mural limpo para comunicados do pastor ou diretrizes da liderança. Evite que assuntos críticos sejam soterrados por chats do WhatsApp.",
      color: "from-amber-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Permissões Granulares",
      desc: "Controle absoluto de quem pode alterar o repertório, publicar avisos ou criar eventos. Crie cargos personalizados (ex: Ministro, Técnico de PA) de acordo com a realidade da sua equipe.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Lock,
      title: "Segurança de Dados",
      desc: "Sistema robusto com autenticação protegida para que as informações confidenciais do seu ministério fiquem sempre seguras.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="funcionalidades-section" className="py-20 relative bg-slate-950/20">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full">
            Recursos Completos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mt-4 tracking-tight">
            Tudo o que sua equipe precisa para servir com excelência
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            Esqueça as gambiarras. O Worship Helper foi desenvolvido entendendo a rotina real de quem serve no louvor de igrejas locais.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
                key={i}
                className="group relative p-6 rounded-2xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/[0.02] w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-[360px]"
              >
                {/* Micro ambient light bar */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />

                <div className="space-y-4">
                  {/* Icon with custom background gradient on hover */}
                  <div className="inline-flex p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white font-display">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Bottom Trust Callout */}
        <div className="mt-16 p-6 rounded-2xl border border-slate-800 bg-slate-950/60 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">Interface projetada para uso em telas escuras</h4>
              <p className="text-xs text-slate-400 mt-0.5">Visão otimizada com baixo brilho, perfeita para uso no altar e coxias escuras.</p>
            </div>
          </div>
          <a
            href="#demo-section"
            className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1 hover:text-cyan-300 group whitespace-nowrap"
          >
            Experimentar no simulador acima
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
