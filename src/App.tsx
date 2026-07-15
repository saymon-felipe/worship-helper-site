/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Star, Calendar, Music, Shield, 
  MessageSquare, ChevronDown, Check, Play, Mail, CheckCircle2, 
  Building, User, ShieldAlert, PhoneCall, HelpCircle, Heart
} from 'lucide-react';

import InteractivePreview from './components/InteractivePreview';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import BenefitsSection from './components/BenefitsSection';

import iconLogo from '../assets/worship-helper-icon.png';
import letterLogo from '../assets/worship-helper-letter.png';

import TermsView from './components/TermsView';
import PrivacyView from './components/PrivacyView';

export default function App() {
  // Global smooth scrolling logic for anchors without hash URL pollution
  useEffect(() => {
    const handleScrollLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const targetId = href.slice(1);
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleScrollLink);
    return () => document.removeEventListener('click', handleScrollLink);
  }, []);

  // Routing view state
  const [currentView, setCurrentView] = useState<'home' | 'termos' | 'privacidade'>('home');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentView]);

  // Modal states
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  // Registration Form States
  const [churchName, setChurchName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Demo Request Form States
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoTeamSize, setDemoTeamSize] = useState('Até 10 membros (Pequena)');
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!churchName || !leaderName || !email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep modal open, show success
    }, 500);
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoPhone || !demoEmail) {
      setDemoError('Preencha todos os campos obrigatórios.');
      return;
    }
    setDemoLoading(true);
    setDemoError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiBaseUrl}/api/solicitar-demonstracao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: demoName,
          phone: demoPhone,
          email: demoEmail,
          teamSize: demoTeamSize,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao enviar a solicitação.');
      }

      setDemoSubmitted(true);
    } catch (err: any) {
      setDemoError(err.message || 'Erro ao conectar ao servidor. Tente novamente.');
    } finally {
      setDemoLoading(false);
    }
  };

  const resetModals = () => {
    setShowSignupModal(false);
    setShowDemoModal(false);
    setIsSubmitted(false);
    setDemoSubmitted(false);
    setChurchName('');
    setLeaderName('');
    setEmail('');
    setPhone('');
    // Reset demo fields
    setDemoName('');
    setDemoPhone('');
    setDemoEmail('');
    setDemoTeamSize('Até 10 membros (Pequena)');
    setDemoError(null);
  };

  const faqs = [
    {
      q: "O Worship Helper é gratuito para experimentar?",
      a: "Sim! Você pode criar sua igreja e testar com até 10 membros e 15 músicas totalmente de graça, sem precisar cadastrar cartão de crédito. É o plano ideal para experimentar a transposição e escalas com sua equipe."
    },
    {
      q: "Como funciona a transposição automática de cifras?",
      a: "Você cadastra a música em um tom padrão e o Worship Helper gera as modulações automaticamente usando nossa tecnologia musical baseada em graus harmônicos. Você pode salvar tons específicos para cada evento sem alterar a cifra original."
    },
    {
      q: "Os músicos podem ver as cifras no tablet ou celular no altar?",
      a: "Com certeza! O Worship Helper foi desenvolvido especificamente para uso em tablets e celulares no altar. Ele conta com uma harmonia de cores otimizada para ambientes escuros e modo noturno nativo, além de rolagem inteligente para que a equipe possa tocar com máxima legibilidade sem distrações."
    },
    {
      q: "Qual a diferença entre comentários globais e de eventos?",
      a: "Esse é um dos nossos maiores diferenciais. Se você quer falar sobre a batida original da música, comente no chat Global da canção. Se você quer avisar o baixista que no culto de domingo faremos um arranjo diferente, comente no chat específico da música dentro daquele Evento."
    },
    {
      q: "É seguro? Músicos novatos podem alterar as músicas?",
      a: "Não. Nosso sistema conta com níveis rígidos de acesso (Pastores, Líderes, Músicos e Observadores). Apenas as funções que possuem permissões podem cadastrar músicas, criar eventos ou gerenciar outras funções."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden font-sans">
      
      {currentView === 'termos' ? (
        <TermsView onBack={() => setCurrentView('home')} logo={iconLogo} email="contato.worshiphelper@gmail.com" />
      ) : currentView === 'privacidade' ? (
        <PrivacyView onBack={() => setCurrentView('home')} logo={iconLogo} email="contato.worshiphelper@gmail.com" />
      ) : (
        <>
          {/* Sticky Header Navigation */}
          <header className="sticky top-0 z-40 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} className="flex items-center gap-2.5 group">
            <img src={iconLogo} alt="Worship Helper Icon Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
            <div>
              <span className="text-sm font-extrabold tracking-tight text-white font-display uppercase block">
                Worship Helper
              </span>
            </div>
          </a>

          {/* Nav menu links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#problema-section" className="hover:text-cyan-400 transition-colors">Problemas</a>
            <a href="#demo-section" className="hover:text-cyan-400 transition-colors">Simulador</a>
            <a href="#funcionalidades-section" className="hover:text-cyan-400 transition-colors">Funcionalidades</a>
            <a href="#como-funciona-section" className="hover:text-cyan-400 transition-colors">Como funciona</a>
            <a href="#beneficios-section" className="hover:text-cyan-400 transition-colors">Benefícios</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </nav>

          {/* Conversion Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDemoModal(true)}
              className="hidden sm:inline-flex text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Falar com Consultor
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              className="relative px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-300 shadow-md shadow-cyan-500/10 hover:shadow-cyan-400/20 cursor-pointer"
            >
              Começar Grátis
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-slate-950">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          
          {/* Trust Batch */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-6 text-xs text-slate-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span className="font-semibold text-slate-200">Plataforma SaaS número #1 de Ministérios de Louvor</span>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-cyan-400 font-mono">Verão 2026</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Organize seu ministério de <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">louvor em um só lugar</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            O Worship Helper centraliza músicas, cifras, tons, eventos, escalas, membros, permissões e avisos. Elimine de vez a desorganização de grupos de WhatsApp e foque no altar.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setShowSignupModal(true)}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl transition-all duration-300 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-400/30 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#demo-section"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-300 bg-slate-900/60 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-300 border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ver funcionalidades</span>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 border-t border-slate-900 pt-8"
          >
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" />
              Teste Grátis de 14 Dias
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" />
              Sem Cartão de Crédito Requerido
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-slate-400 font-semibold ml-1">4.9/5 estrelas de líderes de louvor</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Problem pain points section */}
      <ProblemSection />

      {/* Dynamic Simulator Section Banner & Explanation */}
      <section className="py-12 relative">
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
          <div className="inline-flex p-2 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 border border-cyan-500/20">
            <Sparkles className="w-5 h-5 animate-bounce" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display tracking-tight">
            Experimente a plataforma agora mesmo
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-2 max-w-xl mx-auto">
            Não acredite apenas em palavras. Clique abaixo para navegar de forma 100% interativa por uma simulação de eventos reais, transposição de tons, avisos, escalas e matriz de segurança.
          </p>
        </div>

        {/* The interactive live mockup panel */}
        <div className="px-4">
          <InteractivePreview />
        </div>
      </section>

      {/* Solution details / Features Section */}
      <FeaturesSection />

      {/* How it works pipeline */}
      <HowItWorksSection />

      {/* Spiritual/Human outcomes & benefits section */}
      <BenefitsSection />

      {/* FAQ Objections Section */}
      <section id="faq" className="py-20 bg-slate-950/20 relative">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/[0.01] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full">
              Dúvidas Frequentes
            </span>
            <h2 className="text-3xl font-bold text-white font-display mt-4 tracking-tight">
              Perguntas sobre o Worship Helper
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Seja você um pastor, líder experiente ou músico novato, estamos aqui para esclarecer tudo.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i} 
                  className="rounded-xl border border-slate-900 bg-slate-950/40 overflow-hidden hover:border-slate-800 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left p-5 flex justify-between items-center text-sm font-semibold text-white focus:outline-none cursor-pointer"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-slate-900/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final Conversion High-Contrast Banner */}
      <section className="py-24 bg-gradient-to-t from-[#090d16] to-[#030712] relative overflow-hidden border-t border-slate-900">
        
        {/* Glow backdrop */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-[1.15]">
            Sua equipe de louvor merece mais clareza, menos improviso e mais foco na adoração.
          </h2>

          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Dê adeus ao estresse logístico de última hora. Comece a usar o Worship Helper hoje mesmo e experimente cultos mais organizados e focados.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setShowSignupModal(true)}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-300 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Organizar meu ministério</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-300 border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Solicitar demonstração</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 font-mono">
            Disponível para Web, iOS e Android. Contrato flexível sem fidelidade.
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <img src={iconLogo} alt="Worship Helper Icon Logo" className="w-7 h-7 object-contain" />
              <span className="text-sm font-bold text-white font-display">Worship Helper</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              O Worship Helper é um software feito sob medida para facilitar e organizar a rotina de ensaios, escalas e músicas em igrejas locais.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h5 className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] font-mono">Navegação</h5>
            <div className="grid grid-cols-1 gap-1.5">
              <a href="#problema-section" className="hover:text-cyan-400 transition-colors">Problemas Comuns</a>
              <a href="#demo-section" className="hover:text-cyan-400 transition-colors">Simulador do App</a>
              <a href="#funcionalidades-section" className="hover:text-cyan-400 transition-colors">Funcionalidades</a>
              <a href="#como-funciona-section" className="hover:text-cyan-400 transition-colors">Passo a Passo</a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h5 className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] font-mono">Teológico & Técnico</h5>
            <div className="grid grid-cols-1 gap-1.5">
              <a href="#beneficios-section" className="hover:text-cyan-400 transition-colors">Resultados Práticos</a>
              <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ / Dúvidas</a>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => setShowDemoModal(true)}>Suporte Litúrgico</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => setShowSignupModal(true)}>Plano para Igrejas Pequenas</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <h5 className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] font-mono">Contato</h5>
            <p className="text-[11px] leading-relaxed">
              Dúvidas ou parcerias institucionais?<br />
              <a href="mailto:contato.worshiphelper@gmail.com" className="text-cyan-400 hover:underline">contato.worshiphelper@gmail.com</a>
            </p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 mt-8 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 Worship Helper Inc. Todos os direitos reservados. Foco na adoração e excelência técnica.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-350 cursor-pointer" onClick={() => setCurrentView('termos')}>Termos de Uso</span>
            <span className="hover:text-slate-350 cursor-pointer" onClick={() => setCurrentView('privacidade')}>Políticas de Privacidade</span>
          </div>
        </div>
      </footer>
    </>
  )}


      {/* MODAL 1: SIGN UP/TRIAL MODAL (INTERACTIVE EMULATOR) */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Corner decor */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">Cadastrar meu Ministério</h3>
                </div>
                <button 
                  onClick={resetModals}
                  className="p-1.5 rounded-lg bg-slate-950/40 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Comece sua experiência gratuita hoje mesmo. Configure sua igreja local e adicione seus primeiros músicos.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nome da Igreja / Ministério</label>
                      <input 
                        type="text" 
                        required
                        placeholder="ex: Igreja Batista Alvorada" 
                        value={churchName}
                        onChange={(e) => setChurchName(e.target.value)}
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Seu Nome (Líder / Pastor)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="ex: Pr. João Santos" 
                        value={leaderName}
                        onChange={(e) => setLeaderName(e.target.value)}
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">E-mail de Contato</label>
                      <input 
                        type="email" 
                        required
                        placeholder="ex: lider@igreja.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Telefone / WhatsApp (Opcional)</label>
                      <input 
                        type="tel" 
                        placeholder="ex: (11) 98888-7777" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
                    >
                      <span>Gerar Painel da Igreja</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-center text-slate-500 mt-3">Ao prosseguir, você concorda em liberar o acesso do simulador de adoração.</p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white">Parabéns! Ministério Criado</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      O painel seguro para a <span className="text-white font-semibold">{churchName}</span> foi provisionado com sucesso sob os cuidados de <span className="text-white font-semibold">{leaderName}</span>!
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-850/80 text-left space-y-2">
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block">Detalhes do Acesso Simulado:</span>
                    <p className="text-xs text-slate-300"><span className="text-slate-500">Igreja ID:</span> wh-igreja-{Math.floor(Math.random()*90000 + 10000)}</p>
                    <p className="text-xs text-slate-300"><span className="text-slate-500">Administrador:</span> {leaderName} (JWT Token Ativo)</p>
                    <p className="text-xs text-slate-300"><span className="text-slate-500">E-mail:</span> {email}</p>
                  </div>
                  <button
                    onClick={resetModals}
                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-800 transition-colors"
                  >
                    Voltar para a Landing Page
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* MODAL 2: REQUEST DEMO CONSULTATION */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Corner decor */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">Solicitar Demonstração</h3>
                </div>
                <button 
                  onClick={resetModals}
                  className="p-1.5 rounded-lg bg-slate-950/40 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {!demoSubmitted ? (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Na demonstração, vamos mostrar como o Worship Helper funciona na prática: criação de eventos, cadastro de pessoas, delegação de funções, configuração de permissões, adição de músicas ao repertório e uso no dia a dia da equipe.
                  </p>
                  
                  {demoError && (
                    <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-semibold leading-relaxed">
                      ⚠️ {demoError}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Seu Nome *</label>
                      <input 
                        type="text" 
                        required
                        value={demoName}
                        onChange={(e) => setDemoName(e.target.value)}
                        placeholder="ex: Pr. Marcos Oliveira" 
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">WhatsApp de Contato *</label>
                      <input 
                        type="tel" 
                        required
                        value={demoPhone}
                        onChange={(e) => setDemoPhone(e.target.value)}
                        placeholder="ex: (11) 99999-8888" 
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">E-mail de Contato *</label>
                      <input 
                        type="email" 
                        required
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        placeholder="ex: lider@igreja.com" 
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tamanho da Equipe de Louvor</label>
                      <select 
                        value={demoTeamSize}
                        onChange={(e) => setDemoTeamSize(e.target.value)}
                        className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Até 10 membros (Pequena)">Até 10 membros (Pequena)</option>
                        <option value="De 10 a 30 membros (Média)">De 10 a 30 membros (Média)</option>
                        <option value="Mais de 30 membros (Grande)">Mais de 30 membros (Grande)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={demoLoading}
                      className={`w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 ${
                        demoLoading ? 'opacity-70 cursor-wait' : 'cursor-pointer'
                      }`}
                    >
                      {demoLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Enviando solicitação...</span>
                        </>
                      ) : (
                        <>
                          <span>Agendar meu Horário</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-500 mt-3">Retornamos o contato via WhatsApp em algumas horas.</p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto text-xl font-bold shadow-lg shadow-indigo-500/5">
                    ✓
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white font-display">Solicitação Recebida!</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Obrigado, <strong>{demoName}</strong>! Um dos nossos consultores ministeriais entrará em contato com você pelo seu WhatsApp para agendarmos a melhor data de demonstração.
                    </p>
                    <p className="text-[11px] text-cyan-400 max-w-xs mx-auto">
                      Enviamos um e-mail de confirmação para <strong>{demoEmail}</strong>.
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-left space-y-2 text-xs text-slate-300">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>Análise prévia do ministério iniciada</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>Contato estimado: em algumas horas</span>
                    </p>
                  </div>
                  <button
                    onClick={resetModals}
                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-800 transition-colors"
                  >
                    Fechar Janela
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
