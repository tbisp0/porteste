import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/app/layout/Layout';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  ClipboardList, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle, 
  BarChart2, 
  GitPullRequest, 
  Code2, 
  LayoutDashboard,
  Bell,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight
} from 'lucide-react';
import { BacklogCard } from '@/components/backlogs/BacklogCard';
import { SearchAndFilter } from '@/components/backlogs/SearchAndFilter';

type BacklogStatus = 'not_started' | 'in_progress' | 'in_review' | 'completed';

interface BacklogItem {
  id: number;
  title: string;
  description: string;
  status: BacklogStatus;
  priority: 'low' | 'medium' | 'high';
  category: 'research' | 'design' | 'development' | 'optimization';
  icon: React.ReactNode;
  details: {
    problem: string;
    solution: string;
    impact: string[];
    metrics?: string[];
    technologies?: string[];
  };
  dateAdded: string;
  targetCompletion?: string;
  link?: string;
}

const Backlogs: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    status: string[];
    priority: string[];
    category: string[];
  }>({
    status: [],
    priority: [],
    category: [],
  });

  const backlogs: BacklogItem[] = [
    {
      id: 1,
      title: t('backlogs.backlog1.title', 'Estruturação de Catálogo Digital'),
      description: t('backlogs.backlog1.description', 'Desafio de organização e publicação de produtos em marketplace'),
      status: 'completed',
      priority: 'high',
      category: 'design',
      icon: <ClipboardList className="w-6 h-6" />,
      dateAdded: '2024-01-15',
      targetCompletion: '2024-03-30',
      details: {
        problem: t('backlogs.backlog1.details.problem', 'Dificuldade em organizar e publicar produtos de forma eficiente no marketplace, resultando em baixa visibilidade e vendas.'),
        solution: t('backlogs.backlog1.details.solution', 'Desenvolvimento de uma estrutura de catálogo digital intuitiva com categorização inteligente e publicação em lote.'),
        impact: [
          t('backlogs.backlog1.details.impact.0', 'Aumento de 75% na velocidade de publicação de produtos'),
          t('backlogs.backlog1.details.impact.1', 'Melhoria de 40% na experiência do vendedor'),
          t('backlogs.backlog1.details.impact.2', 'Redução de erros na publicação em 60%')
        ],
        metrics: [
          t('backlogs.backlog1.details.metrics.0', 'Tempo médio de publicação por item'),
          t('backlogs.backlog1.details.metrics.1', 'Taxa de erros na publicação'),
          t('backlogs.backlog1.details.metrics.2', 'NPS do vendedor')
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3']
      },
      link: '#'
    },
    {
      id: 2,
      title: t('backlogs.backlog2.title', 'Otimização de Conversão'),
      description: t('backlogs.backlog2.description', 'Aumento de conversões em página de produto'),
      status: 'in_progress',
      priority: 'high',
      category: 'optimization',
      icon: <TrendingUp className="w-6 h-6" />,
      dateAdded: '2024-02-10',
      targetCompletion: '2024-05-15',
      details: {
        problem: t('backlogs.backlog2.details.problem', 'Taxa de conversão abaixo da média do setor na página de produto.'),
        solution: t('backlogs.backlog2.details.solution', 'Redesenho da página de produto com foco em CTA estratégicos, informações técnicas claras e social proof.'),
        impact: [
          t('backlogs.backlog2.details.impact.0', 'Aumento de 30% na taxa de conversão'),
          t('backlogs.backlog2.details.impact.1', 'Redução de 20% na taxa de rejeição'),
          t('backlogs.backlog2.details.impact.2', 'Melhoria no tempo de sessão em 25%')
        ],
        metrics: [
          t('backlogs.backlog2.details.metrics.0', 'Taxa de conversão'),
          t('backlogs.backlog2.details.metrics.1', 'Taxa de rejeição'),
          t('backlogs.backlog2.details.metrics.2', 'Tempo médio na página')
        ],
        technologies: ['A/B Testing', 'Google Analytics', 'Hotjar', 'Optimizely']
      },
      link: '#'
    },
    {
      id: 3,
      title: t('backlogs.backlog3.title', 'Pesquisa de Usuário'),
      description: t('backlogs.backlog3.description', 'Entendimento de necessidades de clientes B2B'),
      status: 'in_review',
      priority: 'medium',
      category: 'research',
      icon: <Users className="w-6 h-6" />,
      dateAdded: '2024-03-05',
      targetCompletion: '2024-04-20',
      details: {
        problem: t('backlogs.backlog3.details.problem', 'Falta de entendimento aprofundado sobre as necessidades e dores dos clientes B2B.'),
        solution: t('backlogs.backlog3.details.solution', 'Realização de pesquisa qualitativa com usuários B2B para mapear jornadas, dores e oportunidades de melhoria.'),
        impact: [
          t('backlogs.backlog3.details.impact.0', 'Identificação de 5 principais pontos de atrito'),
          t('backlogs.backlog3.details.impact.1', 'Mapeamento de 3 oportunidades de novos recursos'),
          t('backlogs.backlog3.details.impact.2', 'Melhoria na satisfação do cliente')
        ],
        metrics: [
          t('backlogs.backlog3.details.metrics.0', 'Número de entrevistas realizadas'),
          t('backlogs.backlog3.details.metrics.1', 'Taxa de participação'),
          t('backlogs.backlog3.details.metrics.2', 'Satisfação dos participantes')
        ],
        technologies: ['Entrevistas', 'Survey', 'Miro', 'User Personas']
      },
      link: '#'
    },
    {
      id: 4,
      title: t('backlogs.backlog4.title', 'Otimização de Performance'),
      description: t('backlogs.backlog4.description', 'Melhoria de desempenho de aplicação'),
      status: 'not_started',
      priority: 'medium',
      category: 'optimization',
      icon: <Zap className="w-6 h-6" />,
      dateAdded: '2024-03-20',
      targetCompletion: '2024-06-15',
      details: {
        problem: t('backlogs.backlog4.details.problem', 'Tempo de carregamento da aplicação acima do esperado, impactando a experiência do usuário.'),
        solution: t('backlogs.backlog4.details.solution', 'Otimização de código, imagens e recursos para melhorar o desempenho geral da aplicação.'),
        impact: [
          t('backlogs.backlog4.details.impact.0', 'Redução de 50% no tempo de carregamento'),
          t('backlogs.backlog4.details.impact.1', 'Melhoria no Core Web Vitals'),
          t('backlogs.backlog4.details.impact.2', 'Aumento na taxa de conversão')
        ],
        metrics: [
          t('backlogs.backlog4.details.metrics.0', 'Lighthouse Score'),
          t('backlogs.backlog4.details.metrics.1', 'Tempo para Interação'),
          t('backlogs.backlog4.details.metrics.2', 'LCP, FID, CLS')
        ],
        technologies: ['React.memo', 'Code Splitting', 'Lazy Loading', 'Webpack']
      },
      link: '#'
    },
    {
      id: 5,
      title: t('backlogs.backlog5.title', 'Sistema de Notificações em Tempo Real'),
      description: t('backlogs.backlog5.description', 'Implementação de notificações push para engajamento do usuário'),
      status: 'not_started',
      priority: 'low',
      category: 'development',
      icon: <Bell className="w-6 h-6" />,
      dateAdded: '2024-03-25',
      targetCompletion: '2024-07-10',
      details: {
        problem: t('backlogs.backlog5.details.problem', 'Baixo engajamento dos usuários após o primeiro acesso.'),
        solution: t('backlogs.backlog5.details.solution', 'Desenvolvimento de um sistema de notificações em tempo real para manter os usuários engajados.'),
        impact: [
          t('backlogs.backlog5.details.impact.0', 'Aumento de 40% no retorno dos usuários'),
          t('backlogs.backlog5.details.impact.1', 'Melhoria na retenção de usuários'),
          t('backlogs.backlog5.details.impact.2', 'Aumento nas conversões')
        ],
        metrics: [
          t('backlogs.backlog5.details.metrics.0', 'Taxa de abertura de notificações'),
          t('backlogs.backlog5.details.metrics.1', 'Retenção de usuários'),
          t('backlogs.backlog5.details.metrics.2', 'Taxa de conversão pós-notificação')
        ],
        technologies: ['WebSockets', 'Firebase Cloud Messaging', 'Node.js', 'MongoDB']
      },
      link: '#'
    },
    {
      id: 6,
      title: t('backlogs.backlog6.title', 'Dashboard Analítico'),
      description: t('backlogs.backlog6.description', 'Painel de métricas e análises em tempo real'),
      status: 'in_progress',
      priority: 'high',
      category: 'design',
      icon: <LayoutDashboard className="w-6 h-6" />,
      dateAdded: '2024-02-28',
      targetCompletion: '2024-05-30',
      details: {
        problem: t('backlogs.backlog6.details.problem', 'Dificuldade em visualizar e analisar métricas importantes para tomada de decisão.'),
        solution: t('backlogs.backlog6.details.solution', 'Desenvolvimento de um dashboard interativo com as principais métricas do negócio.'),
        impact: [
          t('backlogs.backlog6.details.impact.0', 'Redução de 60% no tempo de análise de dados'),
          t('backlogs.backlog6.details.impact.1', 'Melhoria na tomada de decisão baseada em dados'),
          t('backlogs.backlog6.details.impact.2', 'Identificação mais rápida de oportunidades')
        ],
        metrics: [
          t('backlogs.backlog6.details.metrics.0', 'Tempo gasto na análise de dados'),
          t('backlogs.backlog6.details.metrics.1', 'Número de decisões baseadas em dados'),
          t('backlogs.backlog6.details.metrics.2', 'Satisfação dos usuários')
        ],
        technologies: ['React', 'D3.js', 'Chart.js', 'REST API']
      },
      link: '#'
    }
  ];

  const toggleItem = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (type: 'status' | 'priority' | 'category', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      category: [],
    });
    setSearchTerm('');
  };

  const filteredBacklogs = backlogs.filter(backlog => {
    const matchesSearch = backlog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         backlog.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status.length === 0 || filters.status.includes(backlog.status);
    const matchesCategory = filters.category.length === 0 || filters.category.includes(backlog.category);
    const matchesPriority = filters.priority.length === 0 || filters.priority.includes(backlog.priority);

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  return (
    <Layout>
      <Helmet>
        <title>{t('navigation.backlog')} | Tarcisio Bispo</title>
        <meta name="description" content={t('backlogs.metaDescription', 'Ciclo de Backlogs Estratégicos - Desafios reais e soluções de UX aplicadas')} />
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        <FadeInView>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('backlogs.title', 'Ciclo de Backlogs Estratégicos')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('backlogs.subtitle', 'Desafios reais e soluções de UX aplicadas estrategicamente')}
            </p>
          </div>
        </FadeInView>

        <div className="max-w-6xl mx-auto">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          <div className="space-y-6">
            {filteredBacklogs.length > 0 ? (
              filteredBacklogs.map((backlog, index) => (
                <FadeInView key={backlog.id} delay={0.05 * index}>
                  <BacklogCard
                    {...backlog}
                    isExpanded={expandedId === backlog.id}
                    onToggle={toggleItem}
                  />
                </FadeInView>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {t('backlogs.noResults.title', 'Nenhum backlog encontrado')}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t('backlogs.noResults.description', 'Tente ajustar sua busca ou filtros para encontrar o que procura.')}
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {t('backlogs.clearFilters', 'Limpar todos os filtros')}
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-border/20">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">
                {t('backlogs.cta.title', 'Tem um projeto em mente?')}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {t('backlogs.cta.description', 'Vamos conversar sobre como posso ajudar a transformar seus desafios em soluções inovadoras.')}
              </p>
              <a
                href="/contato"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {t('backlogs.cta.button', 'Entrar em contato')}
                <ChevronRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Backlogs;
