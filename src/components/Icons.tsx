import * as React from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const defaultProps: IconProps = {
  size: 16,
  strokeWidth: 2,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function createIcon(path: React.ReactNode, name: string) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 16, className, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={cn('shrink-0', className)}
        {...defaultProps}
        {...props}
      >
        {path}
      </svg>
    )
  );
  Icon.displayName = name;
  return Icon;
}

// Hardware-style icons for EP-133 aesthetic
export const IconSearch = createIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </>,
  'IconSearch'
);

export const IconFilter = createIcon(
  <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  'IconFilter'
);

export const IconGrid = createIcon(
  <>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </>,
  'IconGrid'
);

export const IconList = createIcon(
  <>
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </>,
  'IconList'
);

export const IconChevronRight = createIcon(
  <path d="m9 18 6-6-6-6" />,
  'IconChevronRight'
);

export const IconChevronLeft = createIcon(
  <path d="m15 18-6-6 6-6" />,
  'IconChevronLeft'
);

export const IconChevronDown = createIcon(
  <path d="m6 9 6 6 6-6" />,
  'IconChevronDown'
);

export const IconExternalLink = createIcon(
  <>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </>,
  'IconExternalLink'
);

export const IconStar = createIcon(
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  'IconStar'
);

export const IconHeart = createIcon(
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  'IconHeart'
);

export const IconMapPin = createIcon(
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>,
  'IconMapPin'
);

export const IconMail = createIcon(
  <>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </>,
  'IconMail'
);

export const IconGlobe = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </>,
  'IconGlobe'
);

export const IconTag = createIcon(
  <>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </>,
  'IconTag'
);

export const IconFolder = createIcon(
  <>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </>,
  'IconFolder'
);

export const IconMusic = createIcon(
  <>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </>,
  'IconMusic'
);

export const IconTool = createIcon(
  <>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </>,
  'IconTool'
);

export const IconUsers = createIcon(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>,
  'IconUsers'
);

export const IconPlay = createIcon(
  <polygon points="5 3 19 12 5 21 5 3" />,
  'IconPlay'
);

export const IconPackage = createIcon(
  <>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </>,
  'IconPackage'
);

export const IconSliders = createIcon(
  <>
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="2" x2="6" y1="14" y2="14" />
    <line x1="10" x2="14" y1="8" y2="8" />
    <line x1="18" x2="22" y1="16" y2="16" />
  </>,
  'IconSliders'
);

export const IconWrench = createIcon(
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  'IconWrench'
);

export const IconSpeaker = createIcon(
  <>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <circle cx="12" cy="14" r="4" />
    <line x1="12" x2="12.01" y1="6" y2="6" />
  </>,
  'IconSpeaker'
);

export const IconX = createIcon(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>,
  'IconX'
);

export const IconCheck = createIcon(
  <polyline points="20 6 9 17 4 12" />,
  'IconCheck'
);

export const IconPlus = createIcon(
  <>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </>,
  'IconPlus'
);

export const IconMinus = createIcon(
  <path d="M5 12h14" />,
  'IconMinus'
);

// Category icon mapper
export function getCategoryIcon(iconName?: string) {
  const icons: Record<string, React.FC<IconProps>> = {
    music: IconMusic,
    sliders: IconSliders,
    package: IconPackage,
    play: IconPlay,
    users: IconUsers,
    wrench: IconWrench,
    tool: IconTool,
    speaker: IconSpeaker,
    folder: IconFolder,
    tag: IconTag,
  };

  return icons[iconName || 'folder'] || IconFolder;
}
