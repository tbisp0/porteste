import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/OptimizedImage';
import { ensureStringArray } from '@/utils/translationHelpers';
import { ProjectsBackground } from '@/components/ui/EnhancedBackground';
import { ProjectCardButton } from '@/components/ui/EnhancedButton';
// CSS já incluído no sistema modular

interface ProjectDetails {
  projectKey: string;
  imageUrl: string;
}

interface EnhancedProjectShowcaseProps {
  projects: ProjectDetails[];
}

/**
 * Enhanced version of ProjectShowcase with modern visual effects
 * This is an example of how to integrate the new visual enhancements
 * while preserving the existing functionality and structure
 */
const EnhancedProjectShowcase: React.FC<EnhancedProjectShowcaseProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleProject = (index: number) => {
    setActiveProject(activeProject === index ? null : index);
  };

  return (
    // Wrap the entire section with enhanced background
    <ProjectsBackground className="py-20">
      <div className="w-full">
        {/* Header Section with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <motion.h2
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('projects.title')}
          </motion.h2>
          <motion.div
            className="h-1 w-20 mb-6 rounded mx-auto"
            style={{ background: "var(--color-primary)" }}
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Enhanced Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.projectKey}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="project-card"
              tabIndex={0}
              role="article"
              aria-labelledby={`project-title-${index}`}
              aria-describedby={`project-overview-${index}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleProject(index);
                }
              }}
            >
              {/* Enhanced Image Container */}
              <motion.div
                className="project-card-image-container"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <OptimizedImage
                  src={project.imageUrl}
                  alt={`${t(`projects.${project.projectKey}.title`)} - ${t('projects.projectImage')}`}
                  className="project-card-image"
                  loading="lazy"
                  width={600}
                  height={300}
                />
                {/* Overlay effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Enhanced Content */}
              <div className="project-card-content">
                {/* Animated Title */}
                <motion.h3
                  id={`project-title-${index}`}
                  className="project-card-title"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {t(`projects.${project.projectKey}.title`)}
                </motion.h3>

                {/* Animated Description */}
                <motion.p
                  className="project-card-description"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                >
                  {t(`projects.${project.projectKey}.overview`)}
                </motion.p>

                {/* Enhanced Tags with stagger animation */}
                <motion.div
                  className="project-card-tags"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                >
                  {ensureStringArray([
                    t(`projects.${project.projectKey}.category`),
                    t('projects.badges.usability'),
                    t('projects.badges.uxResearch')
                  ]).slice(0, 3).map((badge, badgeIndex) => (
                    <motion.span
                      key={badgeIndex}
                      className="project-card-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + 0.6 + badgeIndex * 0.1
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {badge}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Enhanced Action Button */}
                <div className="project-card-actions">
                  <ProjectCardButton
                    onClick={() => toggleProject(index)}
                    className="w-full group"
                  >
                    <motion.span
                      animate={{ rotate: activeProject === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center"
                    >
                      {activeProject === index ? (
                        <EyeOff
                          size={16}
                          className="transition-all duration-300 group-hover:scale-125"
                        />
                      ) : (
                        <Eye
                          size={16}
                          className="transition-all duration-300 group-hover:scale-125"
                        />
                      )}
                    </motion.span>
                    <span className="ml-2">{activeProject === index ? t('projects.seeLess') : t('projects.seeMore')}</span>
                  </ProjectCardButton>
                </div>

                {/* Enhanced Expandable Content */}
                <AnimatePresence>
                  {activeProject === index && (
                    <motion.div
                      id={`project-details-${index}`}
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                        height: { duration: 0.4 }
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="project-expanded-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {/* Enhanced sections with stagger animations */}
                        {[
                          { key: 'discovery', title: t('projects.discovery') },
                          { key: 'solution', title: t('projects.solution') },
                          { key: 'iteration', title: t('projects.iteration') },
                          { key: 'outcomes', title: t('projects.outcomes') },
                          { key: 'insights', title: t('projects.insights') }
                        ].map((section, sectionIndex) => (
                          <motion.div
                            key={section.key}
                            className="project-section"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: sectionIndex * 0.1 + 0.3
                            }}
                          >
                            <h4 className="project-section-title">
                              {section.title}
                            </h4>
                            {section.key === 'outcomes' ? (
                              <ul className="project-section-list">
                                {ensureStringArray(t(`projects.${project.projectKey}.outcomes`)).map((outcome, outcomeIndex) => (
                                  <motion.li
                                    key={outcomeIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: sectionIndex * 0.1 + 0.4 + outcomeIndex * 0.1
                                    }}
                                  >
                                    {outcome}
                                  </motion.li>
                                ))}
                              </ul>
                            ) : (
                              <p className="project-section-content">
                                {t(`projects.${project.projectKey}.${section.key}`)}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </ProjectsBackground>
  );
};

export default EnhancedProjectShowcase;
