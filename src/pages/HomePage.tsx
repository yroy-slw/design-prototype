import { useState } from 'react';
import Icon from '@mdi/react';
import {
  mdiBellOutline,
  mdiArrowRight,
  mdiFileDocumentOutline,
  mdiClockOutline,
  mdiOpenInNew,
  mdiChevronUp,
  mdiChevronDown,
} from '@mdi/js';
import { Breadcrumb } from '../components/Breadcrumb';
import { InfoCard } from '../components/InfoCard';

const BREADCRUMB = [
  { label: 'Mon espace e-démarches', href: '#' },
  { label: 'Mon espace fiscal' },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      margin: 0,
      fontSize: 'var(--md-sys-typescale-headline-small-size, 24px)',
      fontWeight: 700,
      color: 'var(--md-sys-color-on-background, #1d242b)',
      lineHeight: '36px',
    }}>
      {children}
    </h2>
  );
}

function DataField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{
        fontSize: 'var(--md-sys-typescale-body-medium-size, 14px)',
        color: 'var(--md-sys-color-on-surface-variant, #474746)',
        lineHeight: '20px',
        letterSpacing: '0.25px',
      }}>
        {label}
      </span>
      <div style={{
        fontSize: '16px',
        fontWeight: 500,
        color: 'var(--md-sys-color-on-surface, #1d242b)',
        lineHeight: '22px',
      }}>
        {value}
      </div>
    </div>
  );
}

function BtnOutlined({ children, onClick, icon }: { children: React.ReactNode; onClick?: () => void; icon?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', height: '40px', paddingInline: '16px',
        borderRadius: 'var(--md-sys-shape-corner-full, 72px)',
        border: '1px solid var(--md-sys-color-outline, #acaba9)',
        background: 'transparent',
        color: 'var(--md-sys-color-primary, #01629d)',
        fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
        fontWeight: 500, cursor: 'pointer', letterSpacing: '0.1px',
        transition: 'background 0.15s', whiteSpace: 'nowrap',
        alignSelf: 'flex-start',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--md-sys-color-primary, #01629d) 8%, transparent)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {children}
      {icon && <Icon path={icon} size={0.75} />}
    </button>
  );
}

function BtnFilled({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', height: '40px', paddingInline: '16px',
        borderRadius: 'var(--md-sys-shape-corner-full, 72px)',
        border: 'none',
        background: 'var(--md-sys-color-primary, #01629d)',
        color: 'var(--md-sys-color-on-primary, white)',
        fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
        fontWeight: 500, cursor: 'pointer', letterSpacing: '0.1px',
        transition: 'background 0.15s, box-shadow 0.15s', whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'color-mix(in srgb, var(--md-sys-color-primary, #01629d) 92%, white)';
        e.currentTarget.style.boxShadow = '0px 1px 2px rgba(24,31,37,0.08), 0px 1px 3px 1px rgba(24,31,37,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--md-sys-color-primary, #01629d)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </button>
  );
}

// ── Notification list ───────────────────────────────────────────────────────

const NOTIFICATIONS = [
  { label: '0 courriers non lus' },
  { label: '0 message non lu' },
];

function NotificationsSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <SectionTitle>Mes notifications</SectionTitle>
      <div style={{
        border: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)',
        borderRadius: '4px', overflow: 'hidden',
      }}>
        {NOTIFICATIONS.map((n, i) => (
          <div key={i}>
            {i > 0 && <hr style={{ margin: 0, border: 'none', borderTop: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)' }} />}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              padding: '12px 12px 12px 20px',
              background: 'var(--md-sys-color-surface-container-high, #e6f1fa)',
            }}>
              <div style={{ position: 'relative', width: '20px', height: '20px', flexShrink: 0 }}>
                <Icon path={mdiBellOutline} size={0.85} color="var(--md-sys-color-on-surface, #1d242b)" />
                <span style={{
                  position: 'absolute', top: '1px', right: '-3px',
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: 'var(--md-sys-color-error, #ba1b1b)',
                }} />
              </div>
              <span style={{
                flex: 1,
                fontSize: '16px', fontWeight: 500,
                color: 'var(--md-sys-color-on-surface, #1d242b)',
                lineHeight: '22px',
              }}>
                {n.label}
              </span>
              <button style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px',
                color: 'var(--md-sys-color-primary, #01629d)',
              }}>
                <Icon path={mdiArrowRight} size={0.85} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tasks section ───────────────────────────────────────────────────────────

function TasksSection() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SectionTitle>Mes tâches en attentes</SectionTitle>
      <div style={{
        border: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)',
        borderRadius: '4px', overflow: 'hidden',
      }}>
        {/* Header row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '20px',
          padding: '12px 12px 12px 20px',
          background: 'var(--md-sys-color-surface-container-high, #e6f1fa)',
        }}>
          <div style={{ position: 'relative', width: '20px', height: '20px', flexShrink: 0 }}>
            <Icon path={mdiFileDocumentOutline} size={0.85} color="var(--md-sys-color-on-surface, #1d242b)" />
            <span style={{
              position: 'absolute', top: '1px', right: '-3px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--md-sys-color-error, #ba1b1b)',
            }} />
          </div>
          <span style={{
            flex: 1, fontSize: '16px', fontWeight: 500,
            color: 'var(--md-sys-color-on-surface, #1d242b)', lineHeight: '22px',
          }}>
            Compléter 1 déclaration
          </span>
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              color: 'var(--md-sys-color-primary, #01629d)',
              fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
              fontWeight: 500, padding: '0 16px', height: '40px',
            }}
          >
            {expanded ? 'Voir moins' : 'Voir plus'}
            <Icon path={expanded ? mdiChevronUp : mdiChevronDown} size={0.85} />
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <>
            <hr style={{ margin: 0, border: 'none', borderTop: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)' }} />
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '16px', padding: '16px',
              background: 'var(--md-sys-color-surface, white)',
              flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{
                  fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant, #474746)',
                  letterSpacing: '0.25px', lineHeight: '20px',
                }}>
                  Déclaration d'impôts personnes physiques 2026
                </span>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  background: 'var(--md-sys-color-secondary-container, #cedff2)',
                  borderRadius: '8px', padding: '6px 8px', alignSelf: 'flex-start',
                }}>
                  <Icon path={mdiClockOutline} size={0.75} color="var(--md-sys-color-on-surface, #1d242b)" />
                  <span style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface, #1d242b)', lineHeight: '22px' }}>
                    Échéance au 31 mars 2027
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <BtnOutlined>Demander un délai</BtnOutlined>
                <BtnFilled>Gérer mes déclarations</BtnFilled>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── General info section ────────────────────────────────────────────────────

function GeneralInfoSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SectionTitle>Informations générales</SectionTitle>
      <div style={{
        border: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)',
        borderRadius: '4px',
        background: 'var(--md-sys-color-surface, white)',
        padding: '20px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DataField label="Numéro R" value="R345678" />
            <DataField label="Numéro de contribuable" value="567.74.5221" />
            <DataField label="Etat civil" value="Célibataire" />
            <BtnOutlined icon={mdiOpenInNew}>
              Mettre à jour mon état civil ?
            </BtnOutlined>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DataField label="Adresse de correspondance fiscale" value="Rue du Tir 2, 1204 Genève" />
            <DataField label="Adresse de domiciliation" value="Rue du Tir 2, 1204 Genève" />
            <BtnOutlined>Modifier mes adresses</BtnOutlined>
            <DataField
              label="Mes coordonnées de remboursement"
              value={
                <div>
                  <div>IBAN: CH12 3456 7890 1234 5678 9</div>
                  <div>BCGE</div>
                  <div>Titulaire du compte: Nicolas Legenevois</div>
                </div>
              }
            />
            <BtnOutlined>Modifier mes coordonnées bancaires</BtnOutlined>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Breadcrumb items={BREADCRUMB} />
      <div style={{ padding: '0 32px 48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Welcome title */}
        <h1 style={{
          margin: 0,
          fontSize: '40px', fontWeight: 700,
          color: 'var(--md-sys-color-on-background, #1d242b)',
          lineHeight: '50px', letterSpacing: '0px',
        }}>
          Bienvenue Nicolas&nbsp;!
        </h1>

        {/* Welcome info card */}
        <InfoCard
          text={'Bienvenue dans votre nouvel espace "e-démarches fiscales". Découvrez toutes les nouveautés à travers les FAQ et vidéos.'}
          actionLabel="FAQ et vidéos"
        />

        <NotificationsSection />
        <TasksSection />
        <GeneralInfoSection />
      </div>
    </div>
  );
}
