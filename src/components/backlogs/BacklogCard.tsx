import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BacklogCardProps {
  id: number;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'in_review' | 'completed';
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
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

export const BacklogCard: React.FC<BacklogCardProps> = ({
  id,
  title,
  description,
  status,
  priority,
  category,
  icon,
  details,
  dateAdded,
  targetCompletion,
  link,
  isExpanded,
  onToggle,
}) => {
  const { t } = useTranslation();
  
  const statusLabels = {
    not_started: t('backlogs.status.notStarted', 'Not Started'),
    in_progress: t('backlogs.status.inProgress', 'In Progress'),
    in_review: t('backlogs.status.inReview', 'In Review'),
    completed: t('backlogs.status.completed', 'Completed'),
  };

  const priorityLabels = {
    low: t('backlogs.priority.low', 'Low'),
    medium: t('backlogs.priority.medium', 'Medium'),
    high: t('backlogs.priority.high', 'High'),
  };

  const categoryLabels = {
    research: t('backlogs.category.research', 'Research'),
    design: t('backlogs.category.design', 'Design'),
    development: t('backlogs.category.development', 'Development'),
    optimization: t('backlogs.category.optimization', 'Optimization'),
  };

  const statusColors = {
    not_started: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    in_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const categoryIcons = {
    research: '🔍',
    design: '🎨',
    development: '💻',
    optimization: '⚡',
  };

  return (
    <motion.div
      className="bg-card rounded-xl border border-border/20 hover:border-primary/30 transition-all duration-300 overflow-hidden"
      initial={false}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={{
        expanded: { 
          scale: 1.02,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' 
        },
        collapsed: { 
          scale: 1,
          boxShadow: 'none' 
        },
      }}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${priorityColors[priority]}`}>
            {priorityLabels[priority]}
          </span>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {categoryIcons[category]} {categoryLabels[category]}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="border-t border-border/20 px-6 pb-6 pt-4"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { 
                opacity: 1, 
                height: 'auto',
                transition: { 
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98]
                } 
              },
              collapsed: { 
                opacity: 0,
                height: 0,
                transition: { 
                  duration: 0.2,
                  ease: [0.04, 0.62, 0.23, 0.98]
                }
              }
            }}
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">{t('backlogs.details.problem', 'Problem')}</h4>
                  <p className="text-muted-foreground">{details.problem}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t('backlogs.details.solution', 'Proposed Solution')}</h4>
                  <p className="text-muted-foreground">{details.solution}</p>
                </div>
              </div>

              {details.impact && details.impact.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">{t('backlogs.details.expectedImpact', 'Expected Impact')}</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {details.impact.map((impact, index) => (
                      <li key={index}>{impact}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {details.metrics && details.metrics.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">{t('backlogs.details.keyMetrics', 'Key Metrics')}</h4>
                    <ul className="space-y-1">
                      {details.metrics.map((metric, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                          <span className="text-muted-foreground">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {details.technologies && details.technologies.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">{t('backlogs.details.technologies', 'Technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {details.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-border/20 text-sm">
                <div className="text-muted-foreground">
                  {t('backlogs.addedOn', 'Added on')} {new Date(dateAdded).toLocaleDateString()}
                  {targetCompletion && (
                    <span className="ml-4">
                      {t('backlogs.targetCompletion', 'Target')}: {new Date(targetCompletion).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {link && (
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('backlogs.viewDetails', 'View details')}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
