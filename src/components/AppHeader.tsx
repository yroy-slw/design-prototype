import { useEffect, useRef } from 'react';

export function AppHeader() {
  const headerRef = useRef<any>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.showMenu = false;
      headerRef.current.showLogin = true;
      headerRef.current.loginUrl = '#';
      headerRef.current.loginLabel = 'Mon compte';
    }
  }, []);

  return (
    <div style={{ position: 'sticky', top: 0, width: '100%', zIndex: 100 }}>
      <ge-header ref={headerRef} />
    </div>
  );
}
