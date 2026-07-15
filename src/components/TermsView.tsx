/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Shield, Clock, BookOpen, AlertTriangle } from 'lucide-react';

interface TermsViewProps {
  onBack: () => void;
  logo: string;
  email: string;
}

export default function TermsView({ onBack, logo, email }: TermsViewProps) {
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
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-bold">Termos & Regulamentos</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-display mt-2">Termos de Uso</h1>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5" />
              Última atualização: 15 de Julho de 2026
            </p>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">1.</span>
                Aceitação dos Termos
              </h2>
              <p>
                Ao criar uma conta ou utilizar os serviços do <strong>Worship Helper</strong>, você concorda expressamente em estar vinculado a estes Termos de Uso. Se você não concordar com qualquer termo aqui contido, não está autorizado a acessar ou utilizar o software. Estes termos aplicam-se a todos os membros, líderes e pastores cadastrados na plataforma.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">2.</span>
                Descrição do Serviço
              </h2>
              <p>
                O Worship Helper fornece um ecossistema de software hospedado em nuvem projetado para organizar rotinas ministeriais de louvor, incluindo gerenciamento de repertórios de músicas, transposição dinâmica de tons de cifras, escalas de integrantes e mural de comunicados rápidos. O serviço pode incluir ferramentas interativas adicionais em dispositivos móveis e desktops.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">3.</span>
                Contas e Segurança
              </h2>
              <p>
                Para utilizar o sistema, sua igreja precisará de um cadastro administrativo. Você é responsável por manter a confidencialidade das credenciais de acesso da sua conta e de qualquer token JWT gerado pelo sistema. Qualquer atividade realizada sob sua conta é de sua inteira responsabilidade. Caso note acessos suspeitos, notifique nosso suporte imediatamente.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">4.</span>
                Conduta Litúrgica e de Uso
              </h2>
              <p>
                Você concorda em não utilizar a plataforma para armazenar ou transmitir conteúdos ofensivos, materiais com direitos autorais não autorizados (conforme regras de direitos autorais de cifras do seu país) ou arquivos contendo malwares. O sistema é voltado estritamente à cooperação e organização da igreja local, sendo vedado o uso comercial dos dados da comunidade.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">5.</span>
                Limitação de Responsabilidade
              </h2>
              <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-350">
                  O Worship Helper é fornecido "como está" e "conforme disponível". Embora façamos o máximo para manter o serviço 100% online, não nos responsabilizamos por interrupções temporárias de conexão durante ensaios, passagens de som ou celebrações litúrgicas ao vivo.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <span className="text-xs text-cyan-400 font-mono">6.</span>
                Alterações nos Termos e Contato
              </h2>
              <p>
                Reservamo-nos o direito de alterar estes termos a qualquer momento para refletir melhorias técnicas ou políticas comerciais. As alterações entrarão em vigor imediatamente após a publicação no site. Para qualquer dúvida ou notificação legal, entre em contato pelo email oficial: <a href={`mailto:${email}`} className="text-cyan-400 hover:underline">{email}</a>.
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
