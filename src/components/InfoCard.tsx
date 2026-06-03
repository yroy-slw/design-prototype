interface InfoCardProps {
  text: string;
  actionLabel: string;
  onAction?: () => void;
}

export function InfoCard({ text, actionLabel, onAction }: InfoCardProps) {
  return (
    <div
      style={{
        background: 'var(--md-sys-color-primary-container, #cfe5ff)',
        borderRadius: 'var(--md-sys-shape-corner-medium, 12px)',
        padding: '16px',
        boxShadow: '0px 1px 2px rgba(24,31,37,0.3), 0px 1px 6px rgba(24,31,37,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 'var(--md-sys-typescale-body-large-size, 16px)',
          lineHeight: '24px',
          letterSpacing: '0.5px',
          color: 'var(--md-sys-color-on-surface, #1d242b)',
          maxWidth: '620px',
        }}
      >
        {text}
      </p>
      <div>
        <button
          onClick={onAction}
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
          }}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
