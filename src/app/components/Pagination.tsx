'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  chunkSize?: number;
}

export const Pagination = ({
  currentPage,
  pageCount,
  chunkSize = 5,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentChunk = Math.ceil(currentPage / chunkSize);
  const [visibleRange, setVisibleRange] = useState({
    start: (currentChunk - 1) * chunkSize + 1,
    end: Math.min(currentChunk * chunkSize, pageCount)
  });

  useEffect(() => {
    const newChunk = Math.ceil(currentPage / chunkSize);
    setVisibleRange({
      start: (newChunk - 1) * chunkSize + 1,
      end: Math.min(newChunk * chunkSize, pageCount)
    });
  }, [currentPage, chunkSize, pageCount]);

  const handlePrevRange = () => {
    const newStart = Math.max(1, visibleRange.start - chunkSize);
    setVisibleRange({
      start: newStart,
      end: Math.min(newStart + chunkSize - 1, pageCount)
    });
  };

  const handleNextRange = () => {
    const newStart = visibleRange.start + chunkSize;
    setVisibleRange({
      start: newStart,
      end: Math.min(newStart + chunkSize - 1, pageCount)
    });
  };

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 my-8">
      <button
        onClick={handlePrevRange}
        disabled={visibleRange.start === 1}
        className="p-2 rounded-md border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Previous range"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-1">
        {Array.from(
          { length: visibleRange.end - visibleRange.start + 1 },
          (_, i) => {
            const page = visibleRange.start + i;
            return (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`w-10 h-10 rounded-md border flex items-center justify-center cursor-pointer ${
                  page === currentPage
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'hover:bg-gray-50'
                } transition-colors`}
              >
                {page}
              </button>
            );
          }
        )}
      </div>

      <button
        onClick={handleNextRange}
        disabled={visibleRange.end === pageCount}
        className="p-2 rounded-md border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Next range"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};