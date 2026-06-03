import Icon from '@mdi/react';
import { mdiPlus, mdiAccountCircleOutline } from '@mdi/js';

interface TableRow {
  id: string;
  contribuable: string;
  periode: string;
  montant: string;
  statut: string;
  agent: string;
}

interface TableCardProps {
  title: string;
  rows: TableRow[];
  onAdd?: () => void;
  onExport?: () => void;
}

const COLUMNS = ['', 'Contribuable', 'Période fiscale', 'Montant', 'Statut', 'Agent responsable', 'Date création', 'Date modification', 'Actions'];

export function TableCard({ title, rows, onAdd, onExport }: TableCardProps) {
  return (
    <div
      style={{
        background: 'var(--md-sys-color-surface-container, #f0f4f8)',
        borderRadius: 'var(--md-sys-shape-corner-medium, 12px)',
        padding: '24px',
        boxShadow: '0px 1px 1px rgba(0,51,85,0.3), 0px 1px 1.5px rgba(0,51,85,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Section title */}
      <h2
        style={{
          margin: 0,
          fontSize: 'var(--md-sys-typescale-headline-small-size, 24px)',
          fontWeight: 700,
          color: 'var(--md-sys-color-on-surface, #1d242b)',
          lineHeight: '36px',
          letterSpacing: '0px',
        }}
      >
        {title}
      </h2>

      {/* Table */}
      <div
        style={{
          border: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)',
          borderRadius: 'var(--md-sys-shape-corner-extra-small, 4px)',
          overflow: 'hidden',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            background: 'var(--md-sys-color-surface-container-low, #e6f0f7)',
            borderBottom: '1px solid var(--md-sys-color-outline-variant, #d4d2cf)',
          }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col}
              style={{
                flex: col === 'Actions' ? '0 0 87px' : '1',
                padding: '16px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--md-sys-color-on-surface, #1d242b)',
                letterSpacing: '0.1px',
                lineHeight: '20px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rows.map((row, i) => {
          const isStriped = i % 2 === 1;
          return (
            <div
              key={row.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: isStriped
                  ? 'var(--md-sys-color-surface-container-lowest, #f7fafc)'
                  : 'var(--md-sys-color-surface, white)',
                borderBottom: i < rows.length - 1 ? '1px solid var(--md-sys-color-outline-variant, #d4d2cf)' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(1,98,157,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = isStriped ? 'var(--md-sys-color-surface-container-lowest, #f7fafc)' : 'var(--md-sys-color-surface, white)')}
            >
              {/* Checkbox cell */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              </div>
              {/* Contribuable */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon path={mdiAccountCircleOutline} size={0.75} color="var(--md-sys-color-on-surface, #1d242b)" />
                <CellText>{row.contribuable}</CellText>
              </div>
              {/* Période */}
              <div style={{ flex: 1, padding: '16px' }}>
                <CellText>{row.periode}</CellText>
              </div>
              {/* Montant */}
              <div style={{ flex: 1, padding: '16px' }}>
                <CellText>{row.montant}</CellText>
              </div>
              {/* Statut */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon path={mdiAccountCircleOutline} size={0.75} color="var(--md-sys-color-on-surface, #1d242b)" />
                <CellText>{row.statut}</CellText>
              </div>
              {/* Agent */}
              <div style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon path={mdiAccountCircleOutline} size={0.75} color="var(--md-sys-color-on-surface, #1d242b)" />
                <CellText>{row.agent}</CellText>
              </div>
              {/* Date création */}
              <div style={{ flex: 1, padding: '16px' }}>
                <CellText>12.03.2024</CellText>
              </div>
              {/* Date modif */}
              <div style={{ flex: 1, padding: '16px' }}>
                <CellText>15.05.2024</CellText>
              </div>
              {/* Actions */}
              <div style={{ flex: '0 0 87px', padding: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon path={mdiAccountCircleOutline} size={0.75} color="var(--md-sys-color-primary, #01629d)" style={{ cursor: 'pointer' }} />
                <CellText>Cell</CellText>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <button
          onClick={onAdd}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '40px',
            paddingInline: '16px',
            borderRadius: 'var(--md-sys-shape-corner-full, 72px)',
            border: 'none',
            background: 'var(--md-sys-color-primary, #01629d)',
            color: 'white',
            fontSize: 'var(--md-sys-typescale-label-medium-size, 14px)',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.1px',
          }}
        >
          <Icon path={mdiPlus} size={0.85} color="white" />
          Ajouter
        </button>
        <button
          onClick={onExport}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
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
          }}
        >
          Exporter
        </button>
      </div>
    </div>
  );
}

function CellText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: '14px',
        color: 'var(--md-sys-color-on-surface, #1d242b)',
        letterSpacing: '0.25px',
        lineHeight: '20px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </span>
  );
}
