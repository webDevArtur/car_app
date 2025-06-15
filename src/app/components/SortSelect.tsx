'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SortOption } from '../types/car';

const SORT_OPTIONS: SortOption[] = [
  { value: '', label: 'Без сортировки' },
  { value: 'price-asc', label: 'Цена по возрастанию' },
  { value: 'price-desc', label: 'Цена по убыванию' },
];

export const SortSelect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const currentSort = params.get('sort') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(params.toString());

    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }
    newParams.set('page', '1');

    router.push(`/?${newParams.toString()}`);
  };

  return (
    <select
      aria-label="Сортировка автомобилей"
      className="mb-4 p-2 border rounded bg-white"
      value={currentSort}
      onChange={handleChange}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};