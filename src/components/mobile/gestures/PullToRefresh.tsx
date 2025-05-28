/**
 * 🎯 PULL TO REFRESH
 * 
 * Componente para pull-to-refresh
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useMobileGestures } from '../hooks/useMobileGestures';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  className = ''
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
    }
  };

  const { gestureRef } = useMobileGestures({
    onSwipeDown: () => {
      if (pullDistance >= threshold && !isRefreshing) {
        handleRefresh();
      }
    }
  });

  return (
    <div
      ref={gestureRef}
      className={`pull-to-refresh ${className}`}
    >
      {/* Pull indicator */}
      <motion.div
        className="flex justify-center py-4"
        animate={{
          opacity: pullDistance > 0 ? 1 : 0,
          y: Math.min(pullDistance, threshold)
        }}
      >
        <motion.div
          animate={{
            rotate: isRefreshing ? 360 : 0
          }}
          transition={{
            duration: isRefreshing ? 1 : 0,
            repeat: isRefreshing ? Infinity : 0,
            ease: 'linear'
          }}
        >
          <RefreshCw className="w-6 h-6 text-blue-600" />
        </motion.div>
      </motion.div>

      {children}
    </div>
  );
};

export default PullToRefresh;
