import { motion } from 'framer-motion';
import { OptimizedImage } from '../../../ui/OptimizedImage';
import { useLCP } from '../../../hooks/useLCP';

const projectData = [
  {
    title: 'E-commerce Moderno',
    description: 'Plataforma de comércio eletrônico com checkout otimizado e experiência de usuário excepcional.',
    techStack: ['React', 'Next.js', 'Stripe', 'MongoDB'],
    image: '/projects/ecommerce.jpg',
    link: 'https://ecommerce-moderno.com',
    github: 'https://github.com/tarcisiobispo/ecommerce-moderno',
  },
  {
    title: 'Dashboard Analítico',
    description: 'Painel de controle em tempo real com visualizações de dados interativas e dashboards personalizáveis.',
    techStack: ['React', 'Node.js', 'Chart.js', 'MongoDB'],
    image: '/projects/dashboard.jpg',
    link: 'https://dashboard-analitico.com',
    github: 'https://github.com/tarcisiobispo/dashboard-analitico',
  },
  {
    title: 'Aplicação Mobile',
    description: 'Aplicativo híbrido com experiência nativa e integração com serviços em tempo real.',
    techStack: ['React Native', 'Firebase', 'TypeScript'],
    image: '/projects/mobile.jpg',
    link: 'https://app-mobile.com',
    github: 'https://github.com/tarcisiobispo/app-mobile',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Projects = () => {
  const { registerLCP } = useLCP();

  return (
    <motion.section
      id="projetos"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
          Projetos Destaques
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Algumas das minhas soluções mais recentes e impactantes
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <OptimizedImage
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-muted/75 rounded-full text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Ver Projeto
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  Código
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;
