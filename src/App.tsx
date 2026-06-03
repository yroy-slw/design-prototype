import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { DetailPage } from './components/DetailPage';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--md-sys-color-on-surface, #1d242b)',
      }}
    >
      <AppHeader />
      <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <DetailPage />
      </main>
      <AppFooter />
    </div>
  );
}
