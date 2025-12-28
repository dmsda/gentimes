import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export function BentoItem({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
}: BentoItemProps) {
  const colSpanClasses = {
    1: '',
    2: 'sm:col-span-2',
  };

  const rowSpanClasses = {
    1: '',
    2: 'row-span-2',
  };

  return (
    <div
      className={`${colSpanClasses[colSpan]} ${rowSpanClasses[rowSpan]} ${className}`}
    >
      {children}
    </div>
  );
}
