import { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HomePage } from './pages/HomePage';

export default function App() {
  const [navCollapsed, setNavCollapsed] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--md-sys-color-on-surface, #1d242b)',
    }}>
      <AppHeader />

      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <NavigationDrawer
          collapsed={navCollapsed}
          onToggle={() => setNavCollapsed(v => !v)}
        />
        <main style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
          <HomePage />
        </main>
      </div>

      <AppFooter />
    </div>
  );
}
