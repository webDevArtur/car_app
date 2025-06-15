'use client';

import { useCars } from './hooks/useCars';
import { CarCard } from './components/CarCard';
import { CarCardSkeleton } from './components/CarCardSkeleton';
import { Pagination } from './components/Pagination';
import { SortSelect } from './components/SortSelect';
import { Car } from './types/car';
import { Suspense } from 'react';

const CarsGrid = ({ cars }: { cars: Car[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {cars.map((car) => (
      <CarCard key={car.unique_id} car={car} />
    ))}
  </div>
);

const LoadingState = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {Array.from({ length: 12 }).map((_, i) => (
      <CarCardSkeleton key={i} />
    ))}
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <p className="text-center text-red-600">{error}</p>
);

const EmptyState = () => (
  <p className="text-center text-gray-500 mt-20">Нет данных для отображения</p>
);

function PageContent() {
  const { cars, meta, isLoading, error } = useCars();

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error.message} />;
    if (!cars.length) return <EmptyState />;
    return <CarsGrid cars={cars} />;
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <SortSelect />
      {renderContent()}
      {meta.last_page > 1 && (
        <Pagination currentPage={meta.page} pageCount={meta.last_page} />
      )}
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PageContent />
    </Suspense>
  );
}