import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Auto-redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <>
      <Helmet>
        <title>{t('notFound.title')} | Tarcisio Bispo</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <main role="main" className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-primary">404</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('notFound.heading')}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {t('notFound.message')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost gap-2"
            >
              <ArrowLeft size={18} />
              {t('notFound.back')}
            </button>
            
            <Link to="/" className="btn btn-primary gap-2">
              <Home size={18} />
              {t('notFound.home')}
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            {t('notFound.redirect')}
          </p>
        </motion.div>
      </main>
    </>
  );
};

export default NotFoundPage;