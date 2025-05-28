import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const ProjectSkeleton: React.FC = () => (
  <div className="project-card" aria-label="Carregando projeto">
    {/* Image Skeleton */}
    <div className="relative">
      <Skeleton height={200} className="rounded-t-xl" />
    </div>
    
    {/* Content Skeleton */}
    <div className="p-6">
      {/* Title */}
      <Skeleton height={28} className="mb-4" />
      
      {/* Description */}
      <Skeleton count={3} className="mb-2" height={16} />
      
      {/* Tags */}
      <div className="flex gap-2 mt-4 mb-4">
        <Skeleton width={60} height={24} borderRadius={12} />
        <Skeleton width={80} height={24} borderRadius={12} />
        <Skeleton width={70} height={24} borderRadius={12} />
      </div>
      
      {/* Button */}
      <Skeleton height={36} borderRadius={8} />
    </div>
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="text-center" aria-label="Carregando perfil">
    {/* Profile Image */}
    <div className="mb-6">
      <Skeleton circle height={128} width={128} className="mx-auto" />
    </div>
    
    {/* Name */}
    <Skeleton height={40} width={300} className="mb-4 mx-auto" />
    
    {/* Title */}
    <Skeleton height={24} width={200} className="mb-6 mx-auto" />
    
    {/* Bio */}
    <div className="max-w-2xl mx-auto">
      <Skeleton count={3} height={20} className="mb-2" />
    </div>
    
    {/* Buttons */}
    <div className="flex gap-4 justify-center mt-8">
      <Skeleton height={44} width={120} borderRadius={8} />
      <Skeleton height={44} width={120} borderRadius={8} />
    </div>
  </div>
);

export const BacklogSkeleton: React.FC = () => (
  <div className="space-y-6" aria-label="Carregando backlogs">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="border rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Skeleton circle height={48} width={48} />
          <div className="flex-1">
            <Skeleton height={24} width={200} className="mb-2" />
            <Skeleton height={16} width={150} />
          </div>
        </div>
        
        {/* Content */}
        <Skeleton count={2} height={16} className="mb-2" />
        
        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <Skeleton width={80} height={20} borderRadius={10} />
          <Skeleton width={100} height={20} borderRadius={10} />
          <Skeleton width={60} height={20} borderRadius={10} />
        </div>
      </div>
    ))}
  </div>
);

export default ProjectSkeleton;
