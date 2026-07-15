/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Shield, Clock, Lock, Key } from 'lucide-react';

interface PrivacyViewProps {
  onBack: () => void;
  logo: string;
  email: string;
}

export default function PrivacyView({ onBack, logo, email }: PrivacyViewProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Header Bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Início
          </button>
          
          <div className="flex items-center gap-2">
            <img src={logo} alt="Worship Helper Logo" className="w-6 h-6 object-contain" />
            <span className="text-xs font-bold text-white font-display uppercase tracking-wider">Worship Helper</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 md:p-10 space-y-8 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Title block */}
          <div className="border-b border-slate-900 pb-6">
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-bold">Privacidade & Proteção</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-display mt-2">Política de Privacidade</h1>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5" />
              Última atualização: 15 de Julho de 2026
            </p>
          </div>

          {/* Privacy Content Sections */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">1.</span>
                Coleta de Informações
              </h2>
              <p>
                Coletamos informações necessárias para a prestação do serviço ministerial, as quais incluem: dados cadastrais da igreja (nome do ministério, logo), dados de contato do administrador (nome, email, telefone), e dados dos integrantes da equipe de louvor (nome, cargos simulados, tags de instrumentos, foto de perfil vinculada).
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">2.</span>
                Uso das Informações
              </h2>
              <p>
                Os dados coletados são utilizados unicamente para viabilizar as rotinas internas do aplicativo: organizar escalas de cultos, notificar músicos sobre eventos, gerenciar as cifras transpostas nos repertórios ativos e verificar as permissões de acesso com base no cargo do membro no painel. Não vendemos nem compartilhamos nenhuma informação com terceiros para fins de marketing.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">3.</span>
                Segurança dos Dados (JWT)
              </h2>
              <div className="p-4 rounded-xl border border-cyan-500/10 bg-cyan-500/5 flex items-start gap-3">
                <Lock className="w-5 h-5 text-cyan-450 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-350">
                  Implementamos autenticação protegida por tokens baseados em JSON Web Token (JWT). A segurança dos acessos é validada ponta a ponta no servidor, impedindo que membros sem as devidas permissões alterem escalas ou acessem configurações privadas da igreja.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">4.</span>
                Armazenamento e Retenção
              </h2>
              <p>
                Os dados são armazenados em servidores seguros de nuvem. As informações permanecerão ativas na base de dados do Worship Helper enquanto o ministério da sua igreja utilizar os nossos serviços. O administrador da igreja pode solicitar a exclusão integral do perfil da igreja e de todos os dados dos membros associados a qualquer momento pelo suporte.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">5.</span>
                Cookies e Armazenamento Local
              </h2>
              <p>
                Utilizamos armazenamento local (`localStorage` ou cookies de sessão) para manter seu login ativo no seu dispositivo, evitando que você precise preencher suas credenciais a cada acesso. Esses cookies são estritamente técnicos e necessários para o funcionamento básico do software.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">6.</span>
                Fale Conosco
              </h2>
              <p>
                Se você tiver dúvidas sobre nossa política de proteção de dados, quiser exercer seus direitos de exclusão ou retificação de informações pessoais, envie um email oficial para o nosso contato de suporte: <a href={`mailto:${email}`} className="text-cyan-400 hover:underline">{email}</a>.
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600">
        <p>© 2026 Worship Helper Inc. Todos os direitos reservados. Foco na excelência litúrgica.</p>
      </footer>
    </div>
  );
}
