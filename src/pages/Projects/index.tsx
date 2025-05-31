import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/app/layout/Layout';
import { FadeInView } from '@/components/animations/FadeInView';
import { Code, Layout as LayoutIcon, Smartphone, BarChart2, Users, Zap } from 'lucide-react';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>{t('navigation.projects')} | Tarcisio Bispo</title>
        <meta name="description" content={t('projects.description')} />
      </Helmet>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <FadeInView>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('projects.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Projeto 1 */}
          <FadeInView delay={0.1}>
            <motion.div 
              className="bg-card rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('projects.project1.title')}
              </h3>
              <p className="text-muted-foreground mb-4 flex-grow">
                {t('projects.project1.description')}
              </p>
              <div className="mt-auto pt-4 border-t border-border/20">
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center"
                >
                  {t('projects.viewDetails')} <span className="ml-1">→</span>
                </a>
              </div>
            </motion.div>
          </FadeInView>

          {/* Projeto 2 */}
          <FadeInView delay={0.2}>
            <motion.div 
              className="bg-card rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <LayoutIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('projects.project2.title')}
              </h3>
              <p className="text-muted-foreground mb-4 flex-grow">
                {t('projects.project2.description')}
              </p>
              <div className="mt-auto pt-4 border-t border-border/20">
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center"
                >
                  {t('projects.viewDetails')} <span className="ml-1">→</span>
                </a>
              </div>
            </motion.div>
          </FadeInView>

          {/* Projeto 3 */}
          <FadeInView delay={0.3}>
            <motion.div 
              className="bg-card rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('projects.project3.title')}
              </h3>
              <p className="text-muted-foreground mb-4 flex-grow">
                {t('projects.project3.description')}
              </p>
              <div className="mt-auto pt-4 border-t border-border/20">
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center"
                >
                  {t('projects.viewDetails')} <span className="ml-1">→</span>
                </a>
              </div>
            </motion.div>
          </FadeInView>
        </div>
      </main>
    </Layout>
  );
};

export default Projects;
