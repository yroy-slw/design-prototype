import Icon from '@mdi/react';
import {
  mdiHome,
  mdiPlaylistCheck,
  mdiChevronDoubleRight,
  mdiArrowLeft,
  mdiPlus,
} from '@mdi/js';

const NAV_ITEMS = [
  { label: 'Mes démarches' },
  { label: 'Mes documents' },
  { label: 'Mes paiements' },
  { label: 'Mes messages' },
  { label: 'Mon profil' },
];

interface NavigationDrawerProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function NavigationDrawer({ collapsed, onToggle }: NavigationDrawerProps) {
  return (
    <aside
      style={{
        width: collapsed ? '0' : '300px',
        minWidth: collapsed ? '0' : '300px',
        alignSelf: 'stretch',
        background: 'var(--md-sys-color-surface-variant, #e6f1fa)',
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? '0' : '12px',
        overflow: 'hidden',
        transition: 'width 0.2s, min-width 0.2s, padding 0.2s',
        boxShadow: '0px 1px 2px rgba(24,31,37,0.08), 0px 1px 2px rgba(24,31,37,0.15)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '16px',
          paddingBlock: '18px',
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: 'var(--md-sys-typescale-title-large-size, 24px)',
            lineHeight: '28px',
            color: 'var(--md-sys-color-on-surface-variant, #474746)',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Titre
        </p>
        <button
          onClick={onToggle}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '35px',
            height: '35px',
            color: 'var(--md-sys-color-on-surface)',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s',
          }}
          aria-label="Réduire le menu"
        >
          <Icon path={mdiChevronDoubleRight} size={0.9} />
        </button>
      </div>

      {/* Section label */}
      <p
        style={{
          padding: '20px 16px',
          margin: 0,
          fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
          fontWeight: 500,
          color: 'var(--md-sys-color-on-surface, #1d242b)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Lorem ipsum dolor sit
      </p>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0', flexShrink: 0 }}>
        {/* Active item */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            borderRadius: '100px',
            background: 'var(--md-sys-color-secondary-container, #cedff2)',
            cursor: 'pointer',
          }}
        >
          <Icon path={mdiHome} size={0.85} color="var(--md-sys-color-on-surface, #1d242b)" />
          <span
            style={{
              fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
              fontWeight: 500,
              color: 'var(--md-sys-color-on-secondary-container, #101418)',
              whiteSpace: 'nowrap',
            }}
          >
            Accueil
          </span>
        </div>

        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              borderRadius: '100px',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <Icon path={mdiPlaylistCheck} size={0.85} color="var(--md-sys-color-on-surface-variant, #474746)" />
            <span
              style={{
                fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
                fontWeight: 500,
                color: 'var(--md-sys-color-on-surface-variant, #474746)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)', margin: '8px 0', flexShrink: 0 }} />

      {/* Global nav */}
      <div style={{ padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <Icon path={mdiArrowLeft} size={0.85} color="var(--md-sys-color-on-surface, #1d242b)" />
        <span
          style={{
            fontSize: 'var(--md-sys-typescale-label-large-size, 16px)',
            fontWeight: 500,
            color: 'var(--md-sys-color-on-surface, #1d242b)',
            whiteSpace: 'nowrap',
          }}
        >
          Mon espace e-démarches
        </span>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)', margin: '8px 0', flexShrink: 0 }} />

      {/* CTA button */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          height: '40px',
          borderRadius: 'var(--md-sys-shape-corner-full, 72px)',
          border: '1px solid var(--md-sys-color-outline, #acaba9)',
          background: 'transparent',
          color: 'var(--md-sys-color-primary, #01629d)',
          fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
          fontWeight: 500,
          cursor: 'pointer',
          width: '100%',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        <Icon path={mdiPlus} size={0.85} />
        Nouvelle démarche
      </button>
    </aside>
  );
}
