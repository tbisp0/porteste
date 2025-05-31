import { motion } from 'framer-motion';
import { OptimizedImage } from '../../../ui/OptimizedImage';
import { useLCP } from '../../../hooks/useLCP';

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

export const Home = () => {
  const { registerLCP } = useLCP();

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
      className="min-h-screen flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-primary">
          Tarcísio Bispo
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-12">
        <p className="text-xl sm:text-2xl text-center text-muted-foreground max-w-2xl">
          Desenvolvedor Full Stack especializado em React, Node.js e TypeScript. 
          Construindo soluções modernas e escaláveis.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="bg-muted/50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Frontend</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">React</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">TypeScript</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">Tailwind CSS</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Backend</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">Node.js</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">Express</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">MongoDB</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">DevOps</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">Docker</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">AWS</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary">•</span>
                <span className="ml-2">CI/CD</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projetos"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-primary bg-muted/50 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Entrar em Contato
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
