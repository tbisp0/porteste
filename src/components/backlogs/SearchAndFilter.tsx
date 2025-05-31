import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type FilterType = 'status' | 'priority' | 'category';
type FilterValue = string;

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    status: FilterValue[];
    priority: FilterValue[];
    category: FilterValue[];
  };
  onFilterChange: (type: FilterType, value: FilterValue) => void;
  onClearFilters: () => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const filterOptions = {
    status: [
      { value: 'not_started', label: t('backlogs.status.notStarted', 'Not Started') },
      { value: 'in_progress', label: t('backlogs.status.inProgress', 'In Progress') },
      { value: 'in_review', label: t('backlogs.status.inReview', 'In Review') },
      { value: 'completed', label: t('backlogs.status.completed', 'Completed') },
    ],
    priority: [
      { value: 'low', label: t('backlogs.priority.low', 'Low') },
      { value: 'medium', label: t('backlogs.priority.medium', 'Medium') },
      { value: 'high', label: t('backlogs.priority.high', 'High') },
    ],
    category: [
      { value: 'research', label: t('backlogs.category.research', 'Research') },
      { value: 'design', label: t('backlogs.category.design', 'Design') },
      { value: 'development', label: t('backlogs.category.development', 'Development') },
      { value: 'optimization', label: t('backlogs.category.optimization', 'Optimization') },
    ],
  };

  const getFilterLabel = (type: FilterType, value: string) => {
    const option = filterOptions[type].find(opt => opt.value === value);
    return option ? option.label : value;
  };

  const hasActiveFilters = 
    filters.status.length > 0 || 
    filters.priority.length > 0 || 
    filters.category.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isFilterOpen) {
        setIsFilterOpen(false);
        setActiveFilter(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('backlogs.searchPlaceholder', 'Search backlogs...')}
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFilterOpen(!isFilterOpen);
            }}
            className={`inline-flex items-center px-4 py-2 border border-border rounded-lg bg-card text-foreground hover:bg-accent/50 transition-colors ${isFilterOpen ? 'ring-2 ring-primary/50' : ''}`}
          >
            <Filter className="h-5 w-5 mr-2 text-muted-foreground" />
            {t('backlogs.filters', 'Filters')}
            {hasActiveFilters && (
              <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
                {filters.status.length + filters.priority.length + filters.category.length}
              </span>
            )}
          </button>

          {isFilterOpen && (
            <div 
              className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-10 p-4 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t('backlogs.filters', 'Filters')}</h3>
                {hasActiveFilters && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearFilters();
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    {t('backlogs.clearAll', 'Clear all')}
                  </button>
                )}
              </div>

              {Object.entries(filterOptions).map(([type, options]) => (
                <div key={type} className="space-y-2">
                  <button
                    onClick={() => setActiveFilter(activeFilter === type ? null : type as FilterType)}
                    className="w-full flex justify-between items-center text-left text-sm font-medium"
                  >
                    <span>{t(`backlogs.${type}`, type.charAt(0).toUpperCase() + type.slice(1))}</span>
                    <svg
                      className={`h-5 w-5 text-muted-foreground transform transition-transform ${activeFilter === type ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  
                  {activeFilter === type && (
                    <div className="pl-2 space-y-2 border-l-2 border-primary/20">
                      {options.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters[type as FilterType].includes(option.value)}
                            onChange={() => onFilterChange(type as FilterType, option.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded border-border text-primary focus:ring-primary/50"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([type, values]) =>
            values.map((value) => (
              <span
                key={`${type}-${value}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground"
              >
                {getFilterLabel(type as FilterType, value)}
                <button
                  onClick={() => onFilterChange(type as FilterType, value)}
                  className="ml-1.5 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))
          )}
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:underline ml-2 self-center"
          >
            {t('backlogs.clearAll', 'Clear all')}
          </button>
        </div>
      )}
    </div>
  );
};
