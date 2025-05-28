import React, { useState, memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTAButton } from '@/components/ui/buttons';
import { useTranslationArray } from '@/utils/translationHelpers';
import { useProjectSounds, useNavigationSounds } from '@/hooks/useSound';

interface BacklogItem {
  id: string;
  challenge: string;
  solution: string;
  result: string;
  note: string;
}

const ITEMS_PER_PAGE = 4;

const BacklogCycle: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const { playExpand, playCollapse } = useProjectSounds();
  const { playButtonClick, playButtonHover } = useNavigationSounds();

  // Agora os itens vêm das traduções usando função utilitária segura
  const backlogItems = useTranslationArray('backlog.items', t) as Array<{
    challenge: string;
    solution: string;
    result: string;
    note: string;
  }>;

  // Adicionar IDs aos itens para o Accordion
  const backlogItemsWithIds = backlogItems.map((item, index) => ({
    ...item,
    id: `backlog-${index + 1}`
  }));

  const totalPages = Math.ceil(backlogItemsWithIds.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedItems = backlogItemsWithIds.slice(startIdx, endIdx);



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="w-full">
      {/* Header Section - Alinhado com Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <div className="max-w-4xl mx-auto text-left px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4">
            {t('backlog.title')}
          </h1>
          <p className="text-[var(--color-muted)] text-lg mb-4">
            {t('backlog.description')}
          </p>
          {/* Linha Azul Animada - Similar ao Hero */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          ></motion.div>
        </div>
      </motion.div>

      {/* Content Section - Alinhado com Header */}
      <motion.div
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          {paginatedItems.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-muted)]">
              {t('backlog.noItems')}
            </div>
          ) : (
            paginatedItems.map((item, index) => (
              <AccordionItem value={item.id} key={item.id} className="border-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-6 hover:no-underline group [&[data-state=open]]:pb-4">
                    <div className="flex items-center gap-4 w-full min-h-[60px]">
                      {/* Icon Container - Middle Aligned */}
                      <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center self-center">
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)]" />
                      </div>

                      {/* Content Container - Middle Aligned */}
                      <div className="flex-1 text-left flex items-center">
                        <p className="backlog-challenge-text group-hover:text-[var(--color-primary)] transition-colors duration-200 pr-4">
                          {item.challenge}
                        </p>
                      </div>

                      {/* Chevron Icon - Middle Aligned */}
                      <div className="flex-shrink-0 flex items-center justify-center self-center">
                        {/* O ícone do chevron é automaticamente adicionado pelo AccordionTrigger */}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-6 pb-6">
                      {/* Grid Responsivo para as seções */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Solução */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="bg-[var(--color-primary)]/5 rounded-xl p-4 border-l-4 border-[var(--color-primary)]"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center">
                              <Lightbulb className="w-4 h-4 text-[var(--color-primary)]" />
                            </div>
                            <h4 className="font-semibold text-[var(--color-text)]">
                              {t('backlog.solution')}
                            </h4>
                          </div>
                          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            {item.solution}
                          </p>
                        </motion.div>

                        {/* Resultado */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="bg-[var(--color-secondary)]/5 rounded-xl p-4 border-l-4 border-[var(--color-secondary)]"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[var(--color-secondary)]/10 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-[var(--color-secondary)]" />
                            </div>
                            <h4 className="font-semibold text-[var(--color-text)]">
                              {t('backlog.result')}
                            </h4>
                          </div>
                          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            {item.result}
                          </p>
                        </motion.div>

                        {/* Nota */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border-l-4 border-purple-500"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                              <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-semibold text-[var(--color-text)]">
                              {t('backlog.note')}
                            </h4>
                          </div>
                          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            {item.note}
                          </p>
                        </motion.div>

                      </div>
                    </div>
                  </AccordionContent>
                </motion.div>
              </AccordionItem>
            ))
          )}
        </Accordion>

        {/* Paginação Melhorada */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center gap-4 mt-12"
          >
            <CTAButton
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="ghost"
              size="md"
              icon={ChevronLeft}
              iconPosition="left"
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('backlog.previous')}
            </CTAButton>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    playButtonClick();
                  }}
                  onMouseEnter={() => playButtonHover()}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-[var(--color-primary)] text-white shadow-md'
                      : 'text-[var(--color-muted)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]'
                  }`}
                  aria-label={`${t('backlog.page')} ${page}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <CTAButton
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="ghost"
              size="md"
              icon={ChevronRight}
              iconPosition="right"
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('backlog.next')}
            </CTAButton>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default BacklogCycle;
