import React from 'react';

export const CarCardSkeleton: React.FC = () => (
  <div className="border rounded-lg overflow-hidden shadow-md bg-white animate-pulse">
    <div className="h-48 w-full bg-gray-200"></div>
    
    <div className="p-4">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>

      <div className="h-5 w-1/2 bg-gray-200 rounded mb-4"></div>
      
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded"></div>

        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>

        <div className="h-4 w-4/5 bg-gray-200 rounded"></div>

        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      </div>
      
      <div className="mt-4 h-10 w-full bg-gray-200 rounded"></div>
    </div>
  </div>
);