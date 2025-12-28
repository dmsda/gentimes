'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface IndexFiltersProps {
  categories: Category[];
  dateFilter?: string;
  categoryFilter?: string;
}

export function IndexFilters({ categories, dateFilter, categoryFilter }: IndexFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDateChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('date', value);
    } else {
      params.delete('date');
    }
    params.delete('page');
    router.push(`/indeks?${params.toString()}`);
  };

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.delete('page');
    router.push(`/indeks?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('/indeks');
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {/* Date Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-neutral-400">Tanggal:</label>
        <input
          type="date"
          defaultValue={dateFilter}
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-neutral-400">Kategori:</label>
        <select
          defaultValue={categoryFilter || ''}
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>
      
      {/* Reset Filter */}
      {(dateFilter || categoryFilter) && (
        <button
          onClick={handleReset}
          className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-400 hover:text-white"
        >
          Reset Filter
        </button>
      )}
    </div>
  );
}
