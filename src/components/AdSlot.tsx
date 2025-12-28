/**
 * AdSlot Component
 * 
 * A placeholder component for advertising that:
 * - Reserves fixed space to prevent CLS (Cumulative Layout Shift)
 * - Clearly labels ads to distinguish from editorial content
 * - Lazy loads below-the-fold placements
 * 
 * When ready to integrate AdSense:
 * 1. Add your AdSense script to layout.tsx
 * 2. Replace the placeholder div with <ins class="adsbygoogle">
 * 3. Call adsbygoogle.push() in a client component
 */

interface AdSlotProps {
  /** Unique identifier for this ad placement */
  id: string;
  /** Ad format - determines dimensions */
  format: 'leaderboard' | 'rectangle' | 'skyscraper' | 'inline';
  /** Optional label text */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

const AD_DIMENSIONS = {
  // Standard IAB ad sizes
  leaderboard: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50 },
  rectangle: { width: 300, height: 250, mobileWidth: 300, mobileHeight: 250 },
  skyscraper: { width: 160, height: 600, mobileWidth: 160, mobileHeight: 600 },
  inline: { width: 'full', height: 100, mobileWidth: 'full', mobileHeight: 80 },
};

export function AdSlot({ 
  id, 
  format, 
  label = 'Advertisement',
  className = '' 
}: AdSlotProps) {
  const dimensions = AD_DIMENSIONS[format];
  
  // Inline ads are full-width
  const isInline = format === 'inline';
  
  return (
    <aside
      id={`ad-${id}`}
      aria-label={label}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Label */}
      <div className="mb-1 text-center">
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          {label}
        </span>
      </div>
      
      {/* Ad Container - Fixed dimensions to prevent CLS */}
      <div
        className={`
          mx-auto flex items-center justify-center 
          rounded border border-dashed border-neutral-700 
          bg-neutral-900/50 text-neutral-600
          ${isInline ? 'w-full' : ''}
        `}
        style={{
          width: isInline ? '100%' : dimensions.mobileWidth,
          height: dimensions.mobileHeight,
          maxWidth: isInline ? '100%' : dimensions.width,
        }}
        data-ad-slot={id}
        data-ad-format={format}
      >
        {/* Placeholder content - Remove when inserting real ads */}
        <div className="text-center">
          <svg 
            className="mx-auto mb-2 h-6 w-6 text-neutral-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
          <span className="text-xs">Ad Space</span>
        </div>
      </div>
    </aside>
  );
}

/**
 * Responsive ad slot that shows different sizes on mobile vs desktop
 */
export function ResponsiveAdSlot({ id, className = '' }: { id: string; className?: string }) {
  return (
    <aside
      id={`ad-${id}`}
      aria-label="Advertisement"
      className={`relative ${className}`}
    >
      <div className="mb-1 text-center">
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          Advertisement
        </span>
      </div>
      
      {/* Mobile: 320x50 leaderboard */}
      <div 
        className="mx-auto flex h-[50px] w-[320px] items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-600 md:hidden"
        data-ad-slot={`${id}-mobile`}
      >
        320×50
      </div>
      
      {/* Desktop: 728x90 leaderboard */}
      <div 
        className="mx-auto hidden h-[90px] w-[728px] items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-600 md:flex"
        data-ad-slot={`${id}-desktop`}
      >
        728×90
      </div>
    </aside>
  );
}

/**
 * Sticky sidebar ad for desktop (article pages)
 */
export function StickyAdSlot({ id }: { id: string }) {
  return (
    <aside
      id={`ad-${id}`}
      aria-label="Advertisement"
      className="hidden lg:block"
    >
      <div className="sticky top-20">
        <div className="mb-1 text-center">
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
            Advertisement
          </span>
        </div>
        <div 
          className="flex h-[600px] w-[160px] items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-600"
          data-ad-slot={id}
        >
          160×600
        </div>
      </div>
    </aside>
  );
}
