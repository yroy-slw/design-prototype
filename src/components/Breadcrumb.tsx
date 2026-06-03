import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 32px',
        flexShrink: 0,
      }}
      aria-label="Fil d'Ariane"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isLast ? (
              <span
                style={{
                  fontSize: 'var(--md-sys-typescale-body-medium-size, 14px)',
                  color: 'var(--md-sys-color-on-surface-variant, #474746)',
                  letterSpacing: '0.25px',
                }}
              >
                {item.label}
              </span>
            ) : (
              <>
                <a
                  href={item.href || '#'}
                  style={{
                    fontSize: 'var(--md-sys-typescale-body-medium-size, 14px)',
                    color: 'var(--md-sys-color-primary, #01629d)',
                    letterSpacing: '0.25px',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
                <Icon path={mdiChevronRight} size={0.7} color="var(--md-sys-color-on-surface-variant, #474746)" />
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
