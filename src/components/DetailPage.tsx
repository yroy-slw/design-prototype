import { useState } from 'react';
import { NavigationDrawer } from './NavigationDrawer';
import { Breadcrumb } from './Breadcrumb';
import { InfoCard } from './InfoCard';
import { DataCard } from './DataCard';
import { TableCard } from './TableCard';

const BREADCRUMB = [
  { label: 'Accueil', href: '#' },
  { label: 'Mes démarches', href: '#' },
  { label: 'Déclaration d\'impôt', href: '#' },
  { label: 'Dossier 1587656' },
];

const DATA_FIELDS = [
  { label: 'Numéro de dossier', value: '1587656' },
  { label: 'Période fiscale', value: '2023' },
  { label: 'Contribuable', value: 'Martin Dupont' },
  { label: 'Statut', value: 'En cours' },
];

const TABLE_ROWS = [
  { id: '1', contribuable: 'Martin Dupont', periode: '2023', montant: '12 500 CHF', statut: 'En cours', agent: 'A. Rochat' },
  { id: '2', contribuable: 'Sophie Bernard', periode: '2022', montant: '8 200 CHF', statut: 'Clôturé', agent: 'M. Favre' },
  { id: '3', contribuable: 'Jean-Luc Morel', periode: '2023', montant: '31 750 CHF', statut: 'En attente', agent: 'P. Dumont' },
  { id: '4', contribuable: 'Claire Fontaine', periode: '2021', montant: '5 480 CHF', statut: 'Clôturé', agent: 'A. Rochat' },
  { id: '5', contribuable: 'Pierre Leclerc', periode: '2023', montant: '19 100 CHF', statut: 'En cours', agent: 'M. Favre' },
];

export function DetailPage() {
  const [navCollapsed, setNavCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <NavigationDrawer
        collapsed={navCollapsed}
        onToggle={() => setNavCollapsed(v => !v)}
      />

      {/* Main content column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', minWidth: 0 }}>
        <Breadcrumb items={BREADCRUMB} />

        <div
          style={{
            padding: '0 32px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Page title */}
          <h1
            style={{
              margin: 0,
              fontSize: 'var(--md-sys-typescale-headline-large-size, 40px)',
              fontWeight: 700,
              color: 'var(--md-sys-color-on-surface, #1d242b)',
              lineHeight: '50px',
              letterSpacing: '0px',
            }}
          >
            Dossier 1587656
          </h1>

          {/* Info card */}
          <InfoCard
            text="Gérer sa déclaration d'impôt, demander un délai, télécharger une facture QR ..."
            actionLabel="Finaliser mon inscription"
          />

          {/* Data fields card */}
          <DataCard
            fields={DATA_FIELDS}
            primaryActionLabel="Modifier"
            secondaryActionLabel="Archiver"
          />

          {/* Table card */}
          <TableCard
            title="Documents liés"
            rows={TABLE_ROWS}
            onAdd={() => alert('Ajouter un document')}
            onExport={() => alert('Exporter')}
          />
        </div>
      </div>
    </div>
  );
}
