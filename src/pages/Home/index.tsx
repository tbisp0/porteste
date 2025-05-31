import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import Layout from '@/app/layout/Layout';
import { FadeInView } from '@/components/animations/FadeInView';
import { useAudio } from '@/hooks/useAudio';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Code, Layout as LayoutIcon, Smartphone, BarChart2, Users, Zap, Quote, Award, Briefcase, Smile, CheckCircle } from 'lucide-react';

// Componentes de seção
interface HeroSectionProps {
  t: (key: string, fallback: string) => string;
  playSound: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t, playSound }) => (
  <section id="inicio" className="relative flex items-center justify-center min-h-screen overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 z-0" />
    
    {/* Background shapes */}
    <motion.div
      className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl z-0"
      animate={{
        x: [0, 10, 0],
        y: [0, -10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
    
    <div className="container relative z-10 px-4 mx-auto text-center">
      <FadeInView>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t('home.hero.title', 'Olá, eu sou Tarcisio Bispo')}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {t('home.hero.subtitle', 'Product Designer & Full-Stack Developer')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/#projetos" 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            onMouseEnter={playSound}
          >
            {t('home.hero.ctaPrimary', 'Ver Projetos')}
            <ArrowRight size={16} />
          </Link>
          <Link 
            to="/#contato" 
            className="px-6 py-3 border border-foreground/20 rounded-lg hover:bg-accent/50 transition-colors"
            onMouseEnter={playSound}
          >
            {t('home.hero.ctaSecondary', 'Entrar em Contato')}
          </Link>
        </div>
      </FadeInView>
    </div>
    
    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div className="animate-bounce">
        <svg className="w-6 h-6 text-foreground" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
);

interface SectionProps {
  t: (key: string, fallback: string) => string;
}

interface ServicesSectionProps extends SectionProps {}

const ServicesSection: React.FC<ServicesSectionProps> = ({ t }) => {
  const services = [
    {
      icon: <LayoutIcon className="w-8 h-8 mb-4 text-primary" />,
      title: t('home.services.uiux.title', 'UI/UX Design'),
      description: t('home.services.uiux.description', 'Criação de interfaces intuitivas e experiências de usuário excepcionais que encantam e convertem.')
    },
    {
      icon: <Code className="w-8 h-8 mb-4 text-primary" />,
      title: t('home.services.development.title', 'Desenvolvimento Web'),
      description: t('home.services.development.description', 'Soluções web modernas, rápidas e acessíveis com as melhores tecnologias do mercado.')
    },
    {
      icon: <Smartphone className="w-8 h-8 mb-4 text-primary" />,
      title: t('home.services.mobile.title', 'Mobile First'),
      description: t('home.services.mobile.description', 'Experiências otimizadas para dispositivos móveis que engajam os usuários em qualquer lugar.')
    },
    {
      icon: <BarChart2 className="w-8 h-8 mb-4 text-primary" />,
      title: t('home.services.analytics.title', 'Análise de Dados'),
      description: t('home.services.analytics.description', 'Tomada de decisões baseada em dados para melhorar continuamente os resultados.')
    },
    {
      icon: <Users className="w-8 h-8 mb-4 text-primary" />,
      title: t('home.services.research.title', 'Pesquisa de Usuário'),
      description: t('home.services.research.description', 'Entendimento profundo das necessidades e comportamentos dos usuários.')
    },
    {
      icon: <Zap className="w-8 h-8 mb-4 text-primary" />,
      title: t('home.services.performance.title', 'Otimização'),
      description: t('home.services.performance.description', 'Melhoria contínua de performance e experiência do usuário.')
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <FadeInView delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.services.title', 'Como posso te ajudar')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.services.subtitle', 'Ofereço soluções completas para transformar suas ideias em produtos digitais de sucesso')}
            </p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeInView key={index} delay={0.1 * index}>
              <motion.div 
                className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <motion.div 
                    className="mb-4 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectsPreviewProps extends SectionProps {
  onHover?: () => void;
}

const ProjectsPreview: React.FC<ProjectsPreviewProps> = ({ t, onHover }) => (
  <section id="projetos" className="py-20">
    <div className="container mx-auto px-4">
      <FadeInView delay={0.2}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.projects.title', 'Projetos Recentes')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('home.projects.subtitle', 'Alguns dos meus trabalhos mais recentes e desafiadores')}
          </p>
        </div>
      </FadeInView>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <FadeInView key={item} delay={0.1 * item}>
            <motion.div 
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-48 bg-muted/50 flex items-center justify-center overflow-hidden">
                <motion.div 
                  className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-muted-foreground">
                    {t('home.projects.placeholder', 'Imagem do Projeto')} {item}
                  </span>
                </motion.div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {t(`home.projects.project${item}.title`, `Projeto ${item}`)}
                </h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  {t(
                    `home.projects.project${item}.description`,
                    'Descrição breve do projeto e dos desafios enfrentados.'
                  )}
                </p>
                <Link 
                  to={`/projetos/projeto-${item}`}
                  className="inline-flex items-center text-primary hover:underline w-fit group/link"
                  onMouseEnter={onHover}
                >
                  {t('home.projects.viewDetails', 'Ver detalhes')}
                  <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </FadeInView>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link 
          to="/projetos" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t('home.projects.viewAll', 'Ver todos os projetos')}
        </Link>
      </div>
    </div>
  </section>
);

interface ContactSectionProps extends SectionProps {
  onHover?: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ t, onHover }) => (
  <section id="contato" className="py-20 bg-muted">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInView delay={0.3}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.contact.title', 'Vamos trabalhar juntos')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t('home.contact.description', 'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões.')}
          </p>
          <Link 
            to="/contato" 
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
            onMouseEnter={onHover}
          >
            {t('home.contact.cta', 'Entrar em contato')}
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </FadeInView>
      </div>
    </div>
  </section>
);

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  className?: string;
  isActive?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, avatar, className = '', isActive = false }) => (
  <motion.div 
    className={`relative p-6 rounded-xl overflow-hidden h-full flex flex-col ${className} group`}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    {/* Gradiente de fundo */}
    <div className="absolute inset-0 -z-10 opacity-5">
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
    </div>
    
    {/* Efeito de brilho sutil quando ativo */}
    {isActive && (
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    )}
    
    {/* Borda sutil */}
    <div className={`absolute inset-0 -z-10 rounded-xl border ${
      isActive 
        ? 'border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
        : 'border-border/30'
    } transition-all duration-300`} />
    
    <div className="relative z-0 flex-1 flex flex-col">
      <div className="flex-1">
        <Quote className="w-8 h-8 text-primary/30 mb-4" />
        <p className="text-muted-foreground italic mb-6">"{content}"</p>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mr-4 overflow-hidden">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
              }}
            />
          ) : (
            <span className="text-primary font-medium">
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

interface TestimonialsSectionProps extends SectionProps {}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ t }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const autoPlayInterval = React.useRef<NodeJS.Timeout>();

  // Fallback testimonials in case translations fail to load
  const fallbackTestimonials = [
    {
      name: 'João Silva',
      role: 'CEO, Empresa X',
      content: 'Excelente trabalho! O projeto foi entregue dentro do prazo e com qualidade superior ao esperado.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Maria Santos',
      role: 'Diretora de Marketing',
      content: 'Profissional altamente qualificado e comprometido com os resultados. Recomendo!',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
  ];

  // Try to get testimonials from translations, fallback to default if not available
  const { t: anyT } = useTranslation();
  let testimonials = fallbackTestimonials;
  
  try {
    const translatedTestimonials = anyT('home.testimonials.items', { returnObjects: true });
    if (Array.isArray(translatedTestimonials) && translatedTestimonials.length > 0) {
      testimonials = translatedTestimonials as Array<{
        name: string;
        role: string;
        content: string;
        avatar: string;
      }>;
    }
  } catch (error) {
    console.error('Error loading testimonials translations:', error);
  }

  const nextSlide = React.useCallback(() => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  const prevSlide = React.useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Configura o autoplay
  React.useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Pausa o autoplay quando o mouse está sobre o carrossel
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-background to-background" />
      </div>
      <div className="container mx-auto px-4">
        <FadeInView delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.testimonials.title', 'O que dizem sobre mim')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.testimonials.subtitle', 'Feedback de clientes e colegas com quem tive o prazer de trabalhar')}
            </p>
          </div>
        </FadeInView>

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Controles de navegação */}
          <motion.button 
            onClick={prevSlide}
            className="group relative left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-background/80 shadow-md flex items-center justify-center text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 overflow-hidden"
            aria-label="Depoimento anterior"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Efeito de brilho ao passar o mouse */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="sr-only">Depoimento anterior</span>
            <svg 
              className="w-5 h-5 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            
            {/* Efeito de foco acessível */}
            <span className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-focus:ring-primary/50 group-hover:ring-primary/30 transition-all duration-300" />
          </motion.button>
          
          <motion.button 
            onClick={nextSlide}
            className="group relative right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-background/80 shadow-md flex items-center justify-center text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 overflow-hidden"
            aria-label="Próximo depoimento"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Efeito de brilho ao passar o mouse */}
            <span className="absolute inset-0 bg-gradient-to-l from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="sr-only">Próximo depoimento</span>
            <svg 
              className="w-5 h-5 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            
            {/* Efeito de foco acessível */}
            <span className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-focus:ring-primary/50 group-hover:ring-primary/30 transition-all duration-300" />
          </motion.button>

          {/* Carrossel */}
          <div className="overflow-hidden relative h-[400px] md:h-[350px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.5 }
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -50, 
                  scale: 0.95,
                  transition: { 
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1] 
                  }
                }}
                className="w-full absolute top-0 left-0 px-4"
              >
                <TestimonialCard 
                  name={testimonials[activeIndex]?.name || ''}
                  role={testimonials[activeIndex]?.role || ''}
                  content={testimonials[activeIndex]?.content || ''}
                  avatar={testimonials[activeIndex]?.avatar || ''}
                  isActive={true}
                  className="mx-auto max-w-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-3 h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir para depoimento ${index + 1}`}
              >
                {index === activeIndex && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon, delay = 0 }) => {
  // Extrai o número do valor (remove caracteres não numéricos)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isNumeric = !isNaN(numericValue);
  const hasPlus = value.includes('+');
  const hasPercent = value.includes('%');
  
  return (
    <FadeInView delay={delay}>
      <motion.div 
        className="relative text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border/20 hover:shadow-md transition-all duration-300 group overflow-hidden"
        whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}
      >
        {/* Efeito de brilho sutil ao redor do card */}
        <motion.div 
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10"
          initial={false}
        />
        {/* Efeito de gradiente animado sutil no fundo */}
        <motion.div 
          className="absolute inset-0 -z-20 overflow-hidden rounded-xl"
          initial={false}
        >
          <motion.div
            className="absolute -inset-20 opacity-0 group-hover:opacity-30 transition-opacity duration-1000"
            style={{
              background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.1))',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              backgroundPosition: {
                duration: 15,
                ease: 'linear',
                repeat: Infinity,
              },
            }}
          />
        </motion.div>
        
        {/* Efeito de brilho sutil ao redor do card */}
        <motion.div 
          className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.1), transparent 60%)',
          }}
          initial={false}
          variants={{
            hover: {
              opacity: 1,
              transition: { duration: 0.5 }
            }
          }}
        />
        
        {/* Efeito de brilho ao passar o mouse */}
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={false}
          animate={{
            opacity: 0,
            transition: { duration: 0.3 }
          }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent"
            initial={{ x: '-100%', y: '-100%' }}
            whileHover={{
              x: '100%',
              y: '100%',
              transition: { duration: 1, ease: 'easeInOut' }
            }}
          />
        </motion.div>
        
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-inner">
          {/* Efeito de brilho no ícone */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
          <motion.div 
            className="relative z-10"
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
          >
            {React.cloneElement(icon as React.ReactElement, { 
              className: 'w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300',
              style: {
                filter: 'drop-shadow(0 0 2px rgba(99, 102, 241, 0.5))',
              }
            })}
          </motion.div>
        </div>
        <h3 className="text-3xl font-bold mb-2 min-h-[2.5rem] flex items-center justify-center overflow-visible">
          <motion.div 
            className="relative"
            whileHover="hover"
            variants={{
              hover: {
                scale: 1.05,
                transition: { duration: 0.3 }
              }
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              variants={{
                hover: {
                  scale: 1.2,
                  opacity: 0.8,
                  transition: { duration: 0.4 }
                }
              }}
            />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {isNumeric ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CountUp 
                      end={numericValue} 
                      duration={2}
                      separator=","
                      decimals={0}
                      className="inline-block"
                    />
                    {hasPlus && '+'}
                    {hasPercent && '%'}
                  </motion.span>
                </motion.span>
              ) : (
                value
              )}
            </span>
          </motion.div>
        </h3>
        <motion.p 
          className="relative text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 inline-block"
        >
          <span className="relative z-10">{label}</span>
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            variants={{
              hover: {
                width: '100%',
                opacity: 1,
                transition: { duration: 0.4, ease: 'easeOut' }
              }
            }}
          />
        </motion.p>
      </motion.div>
    </FadeInView>
  );
};

interface StatsSectionProps extends SectionProps {}

const StatsSection: React.FC<StatsSectionProps> = ({ t }) => {
  // Fallback stats in case translations fail to load
  const fallbackStats = [
    { value: '50+', label: 'Projetos' },
    { value: '30+', label: 'Clientes' },
    { value: '5+', label: 'Anos de Experiência' },
    { value: '98%', label: 'Taxa de Sucesso' }
  ];

  // Try to get stats from translations, fallback to default if not available
  const { t: anyT } = useTranslation();
  let stats = fallbackStats;
  
  try {
    const translatedStats = anyT('home.stats.items', { returnObjects: true });
    if (Array.isArray(translatedStats) && translatedStats.length > 0) {
      stats = translatedStats as Array<{ value: string; label: string }>;
    }
  } catch (error) {
    console.error('Error loading stats translations:', error);
  }

  const icons = [
    <Briefcase key="projects" className="w-6 h-6" />,
    <Smile key="clients" className="w-6 h-6" />,
    <Award key="experience" className="w-6 h-6" />,
    <CheckCircle key="success" className="w-6 h-6" />
  ];

  // Componente de partículas para o fundo
  const ParticlesBackground = () => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // Tamanho menor para ser mais sutil
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3, // Animação mais lenta
      opacity: Math.random() * 0.1 + 0.05 // Opacidade mais baixa
    }));

    return (
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-50">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [
                particle.opacity * 0.5, 
                particle.opacity * 1.5, 
                particle.opacity * 0.5
              ],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Gradiente de fundo sutil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
        <div className="absolute -top-1/2 right-0 w-full h-full bg-gradient-to-tr from-primary/5 to-transparent opacity-30" />
        <ParticlesBackground />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView delay={0.2}>
          <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.stats.title', 'Em Números')}
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('home.stats.subtitle', 'Algumas métricas que mostram meu crescimento e impacto')}
            </motion.p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <StatItem
                value={stat.value}
                label={stat.label}
                icon={icons[index] || <Briefcase className="w-6 h-6" />}
                delay={0.1 * index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  // Hook para áudio de hover nos botões
  const { playSound } = useAudio();
  
  const playHoverSound = () => {
    playSound({
      src: '/assets/sounds/hover.mp3',
      volume: 0.2,
    });
  };

  return (
    <Layout
      title={t('home.title', 'Portfólio')}
      description={t('home.description', 'Tarcisio Bispo - Product Designer e Full-Stack Developer especializado em experiências digitais acessíveis.')}
      headerTransparent={true}
    >
      <Helmet>
        <title>{t('home.pageTitle', 'Tarcisio Bispo | UX/Product Designer')}</title>
        <meta name="description" content={t('home.metaDescription', 'Portfólio de Tarcisio Bispo de Araujo - UX/Product Designer com foco em estratégia, impacto e experiência.')} />
        <link rel="canonical" href="https://tarcisiobispo.github.io/portfolio/" />
        <meta property="og:title" content={t('home.ogTitle', 'Tarcisio Bispo | UX/Product Designer')} />
        <meta property="og:description" content={t('home.ogDescription', 'Portfólio de Tarcisio Bispo de Araujo - UX/Product Designer com foco em estratégia, impacto e experiência.')} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <main>
        <HeroSection t={t} playSound={playHoverSound} />
        <StatsSection t={t} />
        <ServicesSection t={t} />
        <ProjectsPreview t={t} onHover={playHoverSound} />
        <TestimonialsSection t={t} />
        <ContactSection t={t} onHover={playHoverSound} />
      </main>
    </Layout>
  );
};

export default Home;