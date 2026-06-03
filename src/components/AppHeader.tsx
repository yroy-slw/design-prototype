import { useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { useTheme } from '../context/ThemeContext';

export function AppHeader() {
  const headerRef = useRef<any>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (headerRef.current) {
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
          position: 'absolute',
          top: '50%',
          right: 'calc(var(--spacing) * 4)',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--md-sys-color-on-surface)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 10,
        }}
        aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
      >
        <Icon path={theme === 'light' ? mdiWeatherNight : mdiWeatherSunny} size={0.8} />
      </button>
    </div>
  );
}
