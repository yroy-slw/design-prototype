---
name: ge-prototype
description: Génère des prototypes interactifs React fidèles au Design System GE-DESIGN du Canton de Genève, avec webcomponents header/footer, tokens CSS, dark mode et state management.
version: 1.1.0
---

# Skill : Prototype Interactif GE-DESIGN (Canton de Genève)

## Contexte du projet
Création de prototypes interactifs React pour des tests utilisateurs sur les applications du Canton de Genève. Les prototypes doivent être visuellement fidèles au Design System GE-DESIGN et fonctionnellement réalistes (formulaires, CRUD, navigation, validation).

---

## Stack technique

- **Framework :** React 18 + TypeScript
- **CSS :** Variables CSS GE-DESIGN (inline styles)
- **Icônes :** Material Design Icons (`@mdi/react` + `@mdi/js`)
- **State management :** React Context API
- **Validation :** React Hook Form + Zod
- **Mode :** Light mode par défaut, dark mode supporté via toggle

---

## index.html — template de base

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mon application — Canton de Genève</title>

    <!-- GE-DESIGN system CSS — ordre important : primitives avant light/dark -->
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/fonts.css">
    <link rel="stylesheet" href="https://static.app.ge.ch/theme/css/primitives.css">
    <link id="theme-stylesheet" rel="stylesheet" href="https://static.app.ge.ch/theme/css/light.css">

    <!-- Webcomponents selon le type d'app (voir section "Deux types d'application") -->
  </head>
  <!-- class="light" dès le départ — évite un flash sans variables CSS avant que React monte -->
  <body class="light">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### index.css — styles globaux

```css
*, *::before, *::after { box-sizing: border-box; }

html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: var(--md-ref-typeface-family-brand, 'Roboto', sans-serif);
}

body {
  /* Utiliser --md-sys-color-background (pas surface) pour le fond de page */
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-surface, #1d242b);
}

a { text-decoration: none; }
button { font-family: inherit; }
```

---

## Theme Context — Dark Mode

`light.css` et `dark.css` sont des feuilles scopées aux classes CSS `.light` et `.dark`.
Il faut **toggler les deux classes** sur le body — ne toggler que `.dark` laisse les variables de `light.css` inactives en mode clair.

```tsx
// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('ge-theme') as Theme) || 'light'
  );

  useEffect(() => {
    // Charger dynamiquement le bon fichier CSS
    const link = document.getElementById('theme-stylesheet') as HTMLLinkElement;
    if (link) {
      link.href = `https://static.app.ge.ch/theme/css/${theme}.css`;
    }

    // light.css → scoped à .light / dark.css → scoped à .dark
    // toggler les DEUX sinon les variables du thème actif ne s'appliquent pas
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme === 'dark');

    localStorage.setItem('ge-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

Wrapper dans `main.tsx` :
```tsx
// src/main.tsx
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </ThemeProvider>
);
```

---

## Variables CSS GE-DESIGN — Tokens à utiliser

Les variables s'adaptent automatiquement au thème actif (light/dark) — toujours utiliser les variables, jamais de valeurs hardcodées.

### Couleurs
```css
/* Fond de page */
--md-sys-color-background          /* toujours utiliser pour background-color du body */

/* Surfaces */
--md-sys-color-surface
--md-sys-color-surface-container-low
--md-sys-color-surface-container
--md-sys-color-surface-container-high
--md-sys-color-surface-container-highest

/* Primaire */
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-primary-container
--md-sys-color-on-primary-container

/* Alertes / États */
--md-sys-color-error
--md-sys-color-error-container
--md-sys-color-on-error-container

/* Texte */
--md-sys-color-on-surface
--md-sys-color-on-surface-variant
--md-sys-color-outline
--md-sys-color-outline-variant
```

### Formes
```css
--md-sys-shape-corner-full      /* boutons pill */
--md-sys-shape-corner-medium    /* cards */
--md-sys-shape-corner-small     /* inputs */
```

### Typographie
```css
--md-sys-typescale-label-medium-size
--md-sys-typescale-label-medium-line-height
--md-sys-typescale-body-medium-size
--md-sys-typescale-title-large-size
--md-sys-typescale-headline-small-size
```

### Spacing
```css
--spacing   /* unité de base, multiplier : calc(var(--spacing) * 4) */
```

---

## Composants React réutilisables

### Bouton primaire
```tsx
function BtnPrimary({ children, onClick, disabled }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'calc(var(--spacing) * 2)',
        borderRadius: 'var(--md-sys-shape-corner-full)',
        paddingInline: 'calc(var(--spacing) * 4)',
        paddingBlock: '10px',
        fontSize: 'var(--md-sys-typescale-label-medium-size)',
        fontWeight: 500,
        background: 'var(--md-sys-color-primary)',
        color: 'var(--md-sys-color-on-primary)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}
```

### Bouton secondaire (outlined)
```tsx
function BtnSecondary({ children, onClick }: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'calc(var(--spacing) * 2)',
        borderRadius: 'var(--md-sys-shape-corner-full)',
        paddingInline: 'calc(var(--spacing) * 4)',
        paddingBlock: '10px',
        fontSize: 'var(--md-sys-typescale-label-medium-size)',
        fontWeight: 500,
        background: 'transparent',
        color: 'var(--md-sys-color-primary)',
        border: '1px solid var(--md-sys-color-outline)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
```

### Card surface
```tsx
function Card({ children, variant = 'high' }: {
  children: React.ReactNode;
  variant?: 'low' | 'high' | 'highest' | 'warning' | 'error';
}) {
  const bgMap = {
    low:     'var(--md-sys-color-surface-container-low)',
    high:    'var(--md-sys-color-surface-container-high)',
    highest: 'var(--md-sys-color-surface-container-highest)',
    warning: 'var(--md-sys-color-warning-container, #FFF8E1)',
    error:   'var(--md-sys-color-error-container)',
  };
  return (
    <div style={{
      background: bgMap[variant],
      borderRadius: 'var(--md-sys-shape-corner-medium)',
      padding: 'calc(var(--spacing) * 6)',
      boxShadow: '0 1px 3px 0 rgba(0,51,85,0.15), 0 1px 2px -1px rgba(0,51,85,0.30)',
    }}>
      {children}
    </div>
  );
}
```

### Input text
```tsx
function TextInput({ label, required, placeholder, value, onChange, error }: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--spacing) * 1)' }}>
      <label style={{ fontSize: 'var(--md-sys-typescale-label-medium-size)', color: 'var(--md-sys-color-on-surface)' }}>
        {label}{required && <span style={{ color: 'var(--md-sys-color-error)' }}> *</span>}
      </label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: `1px solid ${error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-outline)'}`,
          borderRadius: 'var(--md-sys-shape-corner-small)',
          padding: 'calc(var(--spacing) * 3)',
          fontSize: 'var(--md-sys-typescale-body-medium-size)',
          color: 'var(--md-sys-color-on-surface)',
          background: 'var(--md-sys-color-surface)',
          width: '100%',
          outline: 'none',
        }}
      />
      {error && (
        <span style={{ fontSize: '12px', color: 'var(--md-sys-color-error)' }}>{error}</span>
      )}
    </div>
  );
}
```

---

## Architecture State Management

```tsx
// src/context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  currentStep: number;
  completedSteps: number[];
  formData: Record<string, unknown>;
}

const defaultState: AppState = {
  currentStep: 0,
  completedSteps: [],
  formData: {},
};

const AppContext = createContext<{
  state: AppState;
  setState: (updater: (prev: AppState) => AppState) => void;
}>({
  state: defaultState,
  setState: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<AppState>(defaultState);
  const setState = (updater: (prev: AppState) => AppState) => setStateRaw(updater);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
```

---

## Comportements pour tests utilisateurs

### Simulation d'upload fichier
```tsx
const [uploading, setUploading] = useState(false);
const [uploaded, setUploaded] = useState(false);

const handleUpload = async () => {
  setUploading(true);
  await new Promise(resolve => setTimeout(resolve, 1500));
  setUploading(false);
  setUploaded(true);
};
```

### Stepper — étape validée
```tsx
import { mdiCheckCircle } from '@mdi/js';
import Icon from '@mdi/react';

<Icon path={mdiCheckCircle} size={1} color="var(--md-sys-color-primary)" />
```

---

## Pattern CRUD standard

```tsx
const [items, setItems] = useState<Item[]>([]);
const [showForm, setShowForm] = useState(false);
const [editingItem, setEditingItem] = useState<Item | null>(null);

const handleAdd = (item: Item) => {
  setItems(prev => [...prev, { ...item, id: Date.now() }]);
  setShowForm(false);
};

const handleDelete = (id: number) => {
  setItems(prev => prev.filter(i => i.id !== id));
};

const handleEdit = (item: Item) => {
  setItems(prev => prev.map(i => i.id === item.id ? item : i));
  setEditingItem(null);
};
```

---

## Terminologie métier

| Terme | Signification |
|---|---|
| Contribuable | L'utilisateur de l'application |
| Certificat de salaire | Document principal pour les revenus |
| Déduction | Montant déductible du revenu imposable |
| Période fiscale | Année fiscale concernée par la déclaration |

---

## Instructions pour Claude Code

Quand tu génères un prototype depuis une frame Figma GE-DESIGN :

1. **Toujours** utiliser le template `index.html` de cette skill (URLs `static.app.ge.ch`, `<body class="light">`)
2. **Toujours** utiliser `background-color: var(--md-sys-color-background)` sur le body
3. **Toujours** utiliser les variables CSS `--md-sys-*` — jamais de couleurs hardcodées
4. **Toujours** créer un `ThemeContext` avec toggle `.light` / `.dark` sur le body
5. **Toujours** créer un `AppContext` pour la persistance des données entre étapes
6. **Toujours** utiliser Material Design Icons (`@mdi/react`) pour les icônes
7. **Toujours** utiliser `mdiWeatherNight` / `mdiWeatherSunny` pour le toggle de thème
8. **Identifier** le type d'application (portail ou back-office) et utiliser le layout correspondant
9. **Portail** → `ge-header-public` + contenu centré 1140px + `ge-footer` pleine largeur
10. **Back-office** → `ge-header` + contenu pleine largeur + sidebar 300px + `ge-footer` pleine largeur
11. **Simuler** les délais réseau (1.5s) pour les uploads et actions asynchrones
12. **Bloquer** la navigation stepper si les champs obligatoires ne sont pas remplis
13. **Lire les tokens Figma** via MCP pour extraire les valeurs exactes
14. **Créer des données mockées** réalistes pour les listes et formulaires

---

## Deux types d'application

### Portail (grand public — ge.ch)

- Contenu centré à **1140px** de large
- Header et footer **pleine largeur** (100%)
- Utiliser `ge-header-public`

**index.html — scripts webcomponents :**
```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header-public/latest/ge-header-public.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
```

```tsx
// src/layouts/PortailLayout.tsx
function PortailLayout({ children, sidebarContent }: {
  children: ReactNode;
  sidebarContent?: ReactNode;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--md-sys-color-on-surface)',
    }}>
      <PortailHeader />
      <main style={{ flex: 1, width: '100%' }}>
        <div style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: 'calc(var(--spacing) * 6) calc(var(--spacing) * 4)',
          width: '100%',
        }}>
          {sidebarContent ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 360px',
              gap: 'calc(var(--spacing) * 6)',
              alignItems: 'start',
            }}>
              <div>{children}</div>
              <aside style={{ position: 'sticky', top: 'calc(var(--spacing) * 6)', alignSelf: 'start' }}>
                {sidebarContent}
              </aside>
            </div>
          ) : children}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

// Header portail
function PortailHeader() {
  const headerRef = useRef<any>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (headerRef.current) {
      // NE PAS setter fullWidth=true — déclenche la classe maxwidth-formulaire (layout narrow)
      headerRef.current.showMenu = true;
      headerRef.current.showLogin = true;
      headerRef.current.loginUrl = '#';
      headerRef.current.loginLabel = 'Connexion';
      headerRef.current.menuData = [];
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ge-header-public ref={headerRef} />
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute', top: '50%', right: 'calc(var(--spacing) * 4)',
          transform: 'translateY(-50%)', background: 'transparent', border: 'none',
          cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center',
        }}
        aria-label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
      >
        <Icon path={theme === 'light' ? mdiWeatherNight : mdiWeatherSunny} size={0.8} color="var(--md-sys-color-on-surface)" />
      </button>
    </div>
  );
}
```

---

### Back-office (applicatif interne)

- Contenu **pleine largeur** (100%)
- Header et footer **pleine largeur** (100%)
- Utiliser `ge-header`

**index.html — scripts webcomponents :**
```html
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-header/latest/ge-header.js"></script>
<script type="module" src="https://static.app.ge.ch/webcomponents/ge-footer/latest/ge-footer.js"></script>
```

#### Chaîne flex pour la hauteur complète de la sidebar

`height: '100%'` ne se résout pas sur la sidebar car les parents flex n'ont pas de hauteur explicite.
La règle : **`minHeight: 0`** sur chaque conteneur flex de la chaîne + **`alignSelf: 'stretch'`** sur la sidebar.

```
App root (flex column, minHeight: 100vh, width: 100%)
  └─ main (flex: 1, minHeight: 0, display: flex, flexDirection: column)
       └─ contenu row (flex: 1, minHeight: 0, display: flex)
            ├─ aside sidebar (alignSelf: stretch) ← s'étire sur toute la hauteur de la rangée
            └─ zone contenu (flex: 1, overflow: auto)
```

```tsx
// src/App.tsx
<div style={{
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  color: 'var(--md-sys-color-on-surface)',
}}>
  <BackofficeHeader />
  <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
    {children}
  </main>
  <AppFooter />
</div>

// Conteneur row (ex: page detail)
<div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
  <aside style={{
    width: '300px',
    flexShrink: 0,
    alignSelf: 'stretch',   // ← NE PAS utiliser height: '100%'
    background: 'var(--md-sys-color-surface-variant)',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {sidebarNav}
  </aside>
  <div style={{ flex: 1, overflow: 'auto' }}>
    {children}
  </div>
</div>
```

```tsx
// Header back-office
function BackofficeHeader() {
  const headerRef = useRef<any>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (headerRef.current) {
      // NE PAS setter fullWidth=true — déclenche la classe maxwidth-formulaire (layout narrow)
      // Sans fullWidth, le webcomponent utilise la classe maxwidth (layout back-office standard)
      headerRef.current.showMenu = false;
      headerRef.current.showLogin = true;
      headerRef.current.loginUrl = '#';
      headerRef.current.loginLabel = 'Mon compte';
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ge-header ref={headerRef} />
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute', top: '50%', right: 'calc(var(--spacing) * 4)',
          transform: 'translateY(-50%)', background: 'transparent', border: 'none',
          cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center',
        }}
        aria-label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
      >
        <Icon path={theme === 'light' ? mdiWeatherNight : mdiWeatherSunny} size={0.8} color="var(--md-sys-color-on-surface)" />
      </button>
    </div>
  );
}

// Footer (portail et back-office)
function AppFooter() {
  const footerRef = useRef<any>(null);

  useEffect(() => {
    if (footerRef.current) {
      // NE PAS setter fullWidth=true
      footerRef.current.locale = 'fr';
      footerRef.current.contactLink = '#';
      footerRef.current.accessibilityLink = '#';
      footerRef.current.privacyLink = '#';
      footerRef.current.termsLink = '#';
    }
  }, []);

  // Wrapper div nécessaire pour que ge-footer prenne 100% de la largeur
  return (
    <div style={{ width: '100%' }}>
      <ge-footer ref={footerRef} />
    </div>
  );
}
```

### Déclaration TypeScript pour les webcomponents

```tsx
// src/types/webcomponents.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'ge-header-public': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'ge-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'ge-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
```

---

## Pièges connus

| Problème | Cause | Correction |
|---|---|---|
| Variables CSS absentes en light mode | `light.css` est scopé à `.light` — sans la classe sur body, rien ne s'applique | Toggler `.light` ET `.dark` dans ThemeContext ; `<body class="light">` dans index.html |
| Fond de page ne change pas au thème | Utilisation de `--md-sys-color-surface` au lieu de `--md-sys-color-background` | `body { background-color: var(--md-sys-color-background) }` dans index.css |
| Header/footer avec max-width narrow (`maxwidth-formulaire`) | `fullWidth = true` sur le webcomponent déclenche ce layout | Ne pas setter `fullWidth` — le webcomponent utilise `maxwidth` par défaut |
| `ge-footer` ne prend pas toute la largeur | Le webcomponent ne s'étire pas seul | Envelopper dans `<div style={{ width: '100%' }}>` |
| Sidebar qui ne prend pas toute la hauteur | `height: '100%'` ne se résout pas sans hauteur explicite sur les parents flex | `alignSelf: 'stretch'` sur la sidebar + `minHeight: 0` sur chaque parent flex |
