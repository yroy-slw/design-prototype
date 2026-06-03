import { useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { useTheme } from '../context/ThemeContext';

export function AppFooter() {
  const footerRef = useRef<any>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.locale = 'fr';
      footerRef.current.contactLink = '#';
      footerRef.current.accessibilityLink = '#';
      footerRef.current.privacyLink = '#';
      footerRef.current.termsLink = '#';
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ge-footer ref={footerRef} />
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          bottom: '50%',
          right: 'calc(var(--spacing) * 4)',
          transform: 'translateY(50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          zIndex: 10,
          color: 'var(--md-sys-color-on-surface)',
          opacity: 0.7,
        }}
        aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
      >
        <Icon path={theme === 'light' ? mdiWeatherNight : mdiWeatherSunny} size={0.9} />
      </button>
    </div>
  );
}
