import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full flex items-center justify-center min-h-[200px]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>{t('footer.copyright')}</p>
          <p className="font-medium">{t('footer.title')}</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
