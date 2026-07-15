/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  XCircle, CheckCircle2, AlertTriangle, MessageSquare, 
  Music, Calendar, HelpCircle, ShieldAlert, ArrowRight, Sparkles 
} from 'lucide-react';

export default function ProblemSection() {
  const [activeTab, setActiveTab] = useState<'caos' | 'clube'>('caos');

  const painPoints = [
    {
      icon: MessageSquare,
      title: "Escalas no WhatsApp",
      solutionTitle: "Escalas Centralizadas e Organizadas",
      description: "Mensagens importantes se perdem em conversas paralelas. Músicos esquecem que estão escalados ou visualizam tarde demais.",
      solution: "Escalas centralizadas no app com notificações automáticas e confirmação de presença em um clique."
    },
    {
      icon: Music,
      title: "Cifras e tons perdidos",
      solutionTitle: "Tons e Transposição Automática",
      description: "No meio do ensaio o vocal pede para mudar o tom da música. Caos total: ninguém acha a cifra no tom novo ou cada um toca em uma tonalidade.",
      solution: "Transposição automática e salvamento do tom específico que a equipe usará naquele evento exato."
    },
    {
      icon: Calendar,
      title: "Falta de clareza nos cultos",
      solutionTitle: "Setlists e Dinâmica de Culto",
      description: "A equipe chega para passar o som e ninguém sabe a ordem das músicas, quem fará o espontâneo ou qual pregação apoiar.",
      solution: "Setlists sequenciais organizados por evento, com observações e marcações de dinâmica em tempo real."
    },
    {
      icon: ShieldAlert,
      title: "Falta de controle e segurança",
      solutionTitle: "Controle de Acessos e Níveis",
      description: "Qualquer pessoa altera o repertório, remove membros ou publica avisos sem autorização, gerando ruído e desorganização.",
      solution: "Hierarquia clara de acessos baseada em JWT: pastores, líderes e músicos têm exatamente as permissões que precisam."
    }
  ];

  return (
    <section id="problema-section" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full">
            Realidade dos Ministérios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mt-4 tracking-tight">
            Você ainda organiza seu ministério no improviso?
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-4 leading-relaxed">
            Mensagens perdidas, músicos confusos, cifras desatualizadas... Liderar louvor não deveria ser sinônimo de gerenciar o caos de última hora.
          </p>
        </div>

        {/* Pain points showcase tabs / comparison toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900/60 p-1.5 rounded-full border border-slate-800 flex items-center relative">
            <button
              onClick={() => setActiveTab('caos')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative z-10 ${
                activeTab === 'caos' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <XCircle className="w-4 h-4" />
              <span>O Caos Comum (Sem App)</span>
              {activeTab === 'caos' && (
                <motion.div
                  layoutId="problem-active-bg"
                  className="absolute inset-0 bg-rose-500 rounded-full -z-10 shadow-lg shadow-rose-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('clube')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative z-10 ${
                activeTab === 'clube' ? 'text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Com Worship Helper</span>
              {activeTab === 'clube' && (
                <motion.div
                  layoutId="problem-active-bg"
                  className="absolute inset-0 bg-cyan-500 rounded-full -z-10 shadow-lg shadow-cyan-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Interactive Comparison Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'caos' ? (
            <motion.div
              key="pain-caos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div 
                    key={index} 
                    className="p-6 rounded-2xl border border-rose-500/10 bg-slate-950/40 hover:bg-slate-950/80 hover:border-rose-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white font-display">{point.title}</h3>
                          <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded uppercase">Erro</span>
                        </div>
                        <p className="text-slate-400 text-xs md:text-sm mt-2 leading-relaxed">
                          {point.description}
                        </p>
                        
                        {/* Quick fix preview */}
                        <div className="mt-4 pt-4 border-t border-slate-900 flex items-center gap-2 text-[11px] text-cyan-400 font-mono font-medium">
                          <span>Como Worship Helper resolve</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="pain-helper"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div 
                    key={index} 
                    className="p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/10 hover:bg-slate-950/80 hover:border-cyan-500/50 transition-all duration-300 group relative"
                  >
                    {/* Glowing corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full blur-md pointer-events-none" />

                    <div className="flex items-start gap-4 relative z-10">
                      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white font-display">{point.solutionTitle}</h3>
                          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Solução
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed">
                          {point.solution}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-slate-900 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Adoração sem distrações garantida</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
