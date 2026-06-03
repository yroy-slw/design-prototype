import Icon from '@mdi/react';
import { mdiPencilOutline } from '@mdi/js';

interface DataField {
  label: string;
  value: string;
}

interface DataCardProps {
  fields: DataField[];
  onEdit?: () => void;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export function DataCard({
  fields,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: DataCardProps) {
  return (
    <div
      style={{
        background: 'var(--md-sys-color-surface-container-lowest, #f7fafc)',
        borderRadius: 'var(--md-sys-shape-corner-medium, 12px)',
        padding: '24px',
        boxShadow: '0px 1px 1px rgba(0,51,85,0.3), 0px 1px 1.5px rgba(0,51,85,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Data fields row */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        {fields.map((field) => (
          <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: 'var(--md-sys-typescale-body-medium-size, 14px)',
                color: 'var(--md-sys-color-on-surface-variant, #474746)',
                letterSpacing: '0.25px',
                lineHeight: '20px',
              }}
            >
              {field.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: 'var(--md-sys-typescale-label-large-size, 16px)',
                  fontWeight: 500,
                  color: 'var(--md-sys-color-on-surface, #1d242b)',
                  lineHeight: '22px',
                }}
              >
                {field.value}
              </span>
              <Icon path={mdiPencilOutline} size={0.75} color="var(--md-sys-color-primary, #01629d)" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)', margin: 0 }} />

      {/* Actions */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <button
          onClick={onPrimaryAction}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            paddingInline: '16px',
            borderRadius: 'var(--md-sys-shape-corner-full, 72px)',
            border: '1px solid var(--md-sys-color-outline, #acaba9)',
            background: 'transparent',
            color: 'var(--md-sys-color-primary, #01629d)',
            fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.1px',
            minWidth: '123px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--md-sys-color-primary, #01629d) 8%, transparent)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          {primaryActionLabel}
        </button>
        <button
          onClick={onSecondaryAction}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            paddingInline: '16px',
            borderRadius: 'var(--md-sys-shape-corner-full, 72px)',
            border: '1px solid var(--md-sys-color-outline, #acaba9)',
            background: 'transparent',
            color: 'var(--md-sys-color-primary, #01629d)',
            fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.1px',
            minWidth: '123px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--md-sys-color-primary, #01629d) 8%, transparent)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          {secondaryActionLabel}
        </button>
      </div>
    </div>
  );
}
