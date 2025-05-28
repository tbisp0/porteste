import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6"
            >
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Política de Privacidade
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Introdução */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">1. Introdução</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais 
                quando você utiliza nosso portfólio e serviços. Estamos comprometidos com a proteção de sua privacidade e 
                cumprimos rigorosamente a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), o Regulamento Geral sobre 
                a Proteção de Dados (GDPR) da União Europeia, e outras legislações aplicáveis de proteção de dados.
              </p>
            </section>

            {/* Dados Coletados */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">2. Dados Coletados</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Dados Fornecidos Voluntariamente</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Formulário de Contato:</strong> Nome, e-mail, telefone, empresa, cargo, mensagem</li>
                <li><strong>Formulário de Feedback:</strong> Nome, e-mail, tipo de feedback, mensagem, seção do site</li>
                <li><strong>Newsletter:</strong> E-mail e preferências de comunicação</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.2 Dados Coletados Automaticamente</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, sistema operacional</li>
                <li><strong>Cookies e Tecnologias Similares:</strong> Preferências de tema, idioma, configurações de acessibilidade</li>
                <li><strong>Analytics:</strong> Páginas visitadas, tempo de permanência, origem do tráfego (dados anonimizados)</li>
                <li><strong>Dados de Performance:</strong> Velocidade de carregamento, erros técnicos</li>
              </ul>
            </section>

            {/* Finalidades */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">3. Finalidades do Tratamento</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Comunicação Profissional</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Responder solicitações, enviar propostas comerciais, manter relacionamento profissional
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Melhoria dos Serviços</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Analisar feedback, otimizar experiência do usuário, desenvolver novos recursos
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Personalização</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Salvar preferências de tema, idioma e acessibilidade para melhor experiência
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Segurança</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Prevenir fraudes, detectar atividades suspeitas, garantir integridade dos dados
                  </p>
                </div>
              </div>
            </section>

            {/* Base Legal */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Base Legal (LGPD)</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li><strong>Art. 7º, I - Consentimento:</strong> Para envio de newsletter e comunicações promocionais</li>
                  <li><strong>Art. 7º, IV - Interesse Legítimo:</strong> Para analytics e melhoria dos serviços</li>
                  <li><strong>Art. 7º, V - Execução de Contrato:</strong> Para prestação de serviços profissionais</li>
                  <li><strong>Art. 7º, VI - Exercício de Direitos:</strong> Para responder solicitações e exercer direitos</li>
                </ul>
              </div>
            </section>

            {/* Compartilhamento */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Seus dados pessoais podem ser compartilhados apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Prestadores de Serviço:</strong> EmailJS (envio de e-mails), Google Analytics (análise de tráfego)</li>
                <li><strong>Obrigação Legal:</strong> Quando exigido por lei ou ordem judicial</li>
                <li><strong>Proteção de Direitos:</strong> Para proteger nossos direitos, propriedade ou segurança</li>
                <li><strong>Consentimento Expresso:</strong> Com sua autorização prévia e específica</li>
              </ul>
            </section>

            {/* Seus Direitos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Seus Direitos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Direitos LGPD</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Confirmação da existência de tratamento</li>
                    <li>• Acesso aos dados</li>
                    <li>• Correção de dados incompletos/inexatos</li>
                    <li>• Anonimização, bloqueio ou eliminação</li>
                    <li>• Portabilidade dos dados</li>
                    <li>• Eliminação dos dados tratados com consentimento</li>
                    <li>• Revogação do consentimento</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Como Exercer</h4>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>tbisp0@hotmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+55 (19) 99013-7380</span>
                    </div>
                    <p className="mt-2">Resposta em até 15 dias úteis</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Segurança */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Segurança dos Dados</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                  <li>• Criptografia HTTPS/SSL</li>
                  <li>• Controle de acesso restrito</li>
                  <li>• Monitoramento de segurança</li>
                  <li>• Backups regulares</li>
                  <li>• Atualizações de segurança</li>
                  <li>• Treinamento da equipe</li>
                </ul>
              </div>
            </section>

            {/* Retenção */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Retenção de Dados</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Tipo de Dado</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Período de Retenção</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">Dados de Contato</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">5 anos após último contato</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">Feedback</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">3 anos para melhoria dos serviços</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">Analytics</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">26 meses (Google Analytics)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">Preferências</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">Até revogação do usuário</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Cookies e Tecnologias Similares</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Utilizamos cookies e localStorage para melhorar sua experiência:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Cookies Essenciais</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Necessários para funcionamento básico (tema, idioma, acessibilidade)</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Cookies de Performance</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Google Analytics para entender como você usa o site (anonimizados)</p>
                </div>
              </div>
            </section>

            {/* Transferência Internacional */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Transferência Internacional</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Alguns de nossos prestadores de serviço podem estar localizados fora do Brasil (Google, EmailJS). 
                Garantimos que essas transferências atendem aos requisitos da LGPD e GDPR, com cláusulas contratuais 
                padrão e certificações adequadas de proteção de dados.
              </p>
            </section>

            {/* Alterações */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Alterações nesta Política</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas 
                através do e-mail cadastrado ou aviso no site. Recomendamos revisar esta página regularmente.
              </p>
            </section>

            {/* Contato DPO */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Encarregado de Dados (DPO)</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Para questões relacionadas à proteção de dados, entre em contato:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span><strong>E-mail:</strong> tbisp0@hotmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span><strong>Telefone:</strong> +55 (19) 99013-7380</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span><strong>Localização:</strong> Campinas, SP, Brasil</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Rodapé */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Esta política está em conformidade com a LGPD (Lei 13.709/2018), GDPR (Regulamento UE 2016/679), 
                CCPA (California Consumer Privacy Act) e outras legislações aplicáveis de proteção de dados.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
