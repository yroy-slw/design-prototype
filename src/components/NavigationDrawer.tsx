import Icon from '@mdi/react';
import {
  mdiHome,
  mdiEmailOutline,
  mdiCashMultiple,
  mdiPlaylistCheck,
  mdiForum,
  mdiHelpCircleOutline,
  mdiChevronDoubleRight,
  mdiOpenInNew,
  mdiChevronDown,
  mdiPlus,
} from '@mdi/js';

const NAV_ITEMS = [
  { label: 'Accueil',                  icon: mdiHome,              active: true  },
  { label: 'Mes courriers reçus',      icon: mdiEmailOutline,      active: false },
  { label: 'Mes comptes et paiements', icon: mdiCashMultiple,      active: false },
  { label: 'E-démarches fiscales',     icon: mdiPlaylistCheck,     active: false },
  { label: 'Nous contacter',           icon: mdiForum,             active: false },
  { label: 'Aide',                     icon: mdiHelpCircleOutline, active: false, external: true },
];

interface NavigationDrawerProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function NavigationDrawer({ collapsed, onToggle }: NavigationDrawerProps) {
  return (
    <aside
      style={{
        width: collapsed ? '80px' : '360px',
        minWidth: collapsed ? '80px' : '360px',
        alignSelf: 'stretch',
        background: 'var(--md-sys-color-surface-variant, #e6f1fa)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: collapsed ? 'center' : 'flex-start',
        padding: '12px',
        overflow: 'hidden',
        transition: 'width 0.2s, min-width 0.2s',
        boxShadow: '0px 1px 2px rgba(24,31,37,0.08), 0px 1px 2px rgba(24,31,37,0.15)',
        flexShrink: 0,
      }}
    >
      {/* ── Toggle button ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        width: '100%',
        paddingLeft: collapsed ? 0 : '16px',
        paddingBlock: '18px',
        flexShrink: 0,
      }}>
        {!collapsed && (
          <p style={{
            fontWeight: 700,
            fontSize: 'var(--md-sys-typescale-title-large-size, 24px)',
            lineHeight: '28px',
            color: 'var(--md-sys-color-on-surface-variant, #474746)',
            margin: 0, whiteSpace: 'nowrap',
          }}>
            Mon espace fiscal
          </p>
        )}
        <button
          onClick={onToggle}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '35px', height: '35px',
            color: 'var(--md-sys-color-on-surface)',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
          aria-label={collapsed ? 'Déplier le menu' : 'Réduire le menu'}
        >
          <Icon path={mdiChevronDoubleRight} size={0.9} />
        </button>
      </div>

      {/* ── Nav items ── */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flexShrink: 0,
        alignItems: collapsed ? 'center' : 'flex-start',
      }}>
        {NAV_ITEMS.map((item) => (
          collapsed
            /* Rail mode — icône seule dans un container 56×56 */
            ? (
              <div
                key={item.label}
                title={item.label}
                style={{
                  width: '56px', height: '56px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  width: '56px', height: '56px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '100px',
                  background: item.active
                    ? 'var(--md-sys-color-secondary-container, #cedff2)'
                    : 'transparent',
                }}>
                  <Icon
                    path={item.icon}
                    size={1}
                    color={item.active
                      ? 'var(--md-sys-color-on-secondary-container, #101418)'
                      : 'var(--md-sys-color-on-surface-variant, #474746)'}
                  />
                </div>
              </div>
            )
            /* Expanded mode — icône + label */
            : (
              <div
                key={item.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px', width: '100%',
                  borderRadius: '100px', cursor: 'pointer',
                  background: item.active
                    ? 'var(--md-sys-color-secondary-container, #cedff2)'
                    : 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => {
                  if (!item.active) e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={e => {
                  if (!item.active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon
                  path={item.icon}
                  size={0.85}
                  color={item.active
                    ? 'var(--md-sys-color-on-secondary-container, #101418)'
                    : 'var(--md-sys-color-on-surface-variant, #474746)'}
                />
                <span style={{
                  flex: 1,
                  fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
                  fontWeight: 500,
                  color: item.active
                    ? 'var(--md-sys-color-on-secondary-container, #101418)'
                    : 'var(--md-sys-color-on-surface-variant, #474746)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
                {item.external && (
                  <Icon path={mdiOpenInNew} size={0.75} color="var(--md-sys-color-on-surface-variant, #474746)" />
                )}
              </div>
            )
        ))}
      </nav>

      {/* ── Mes autres espaces ── */}
      {collapsed ? (
        /* Rail : badge circulaire 40px */
        <div
          title="Mes autres espaces"
          style={{
            marginTop: '8px',
            width: '40px', height: '40px',
            borderRadius: '50px',
            background: 'var(--md-sys-color-surface, white)',
            boxShadow: '0px 1px 1px rgba(24,31,37,0.08), 0px 1px 2px rgba(24,31,37,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          {/* Représentation simplifiée du logo e-démarches */}
          <span style={{
            fontSize: '10px', fontWeight: 700,
            color: 'var(--md-sys-color-primary, #01629d)',
            letterSpacing: '-0.5px',
          }}>
            e
          </span>
        </div>
      ) : (
        /* Expanded : pill complet */
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          margin: '8px 0', padding: '10px 16px', width: '100%',
          borderRadius: '50px',
          background: 'var(--md-sys-color-surface, white)',
          boxShadow: '0px 1px 1px rgba(24,31,37,0.08), 0px 1px 2px rgba(24,31,37,0.15)',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <span style={{
            flex: 1,
            fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
            fontWeight: 500,
            color: 'var(--md-sys-color-on-surface, #1d242b)',
            whiteSpace: 'nowrap',
          }}>
            Mes autres espaces
          </span>
          <Icon path={mdiChevronDown} size={0.75} color="var(--md-sys-color-on-surface, #1d242b)" />
        </div>
      )}

      {/* ── CTA button — collé en bas via margin-top: auto ── */}
      {!collapsed && (
        <button
          style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', height: '40px',
            borderRadius: 'var(--md-sys-shape-corner-full, 72px)',
            border: '1px solid var(--md-sys-color-outline, #acaba9)',
            background: 'transparent',
            color: 'var(--md-sys-color-primary, #01629d)',
            fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
            fontWeight: 500, cursor: 'pointer',
            width: '100%', flexShrink: 0, whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--md-sys-color-primary, #01629d) 8%, transparent)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <Icon path={mdiPlus} size={0.85} />
          Nouvelle démarche
        </button>
      )}
    </aside>
  );
}
