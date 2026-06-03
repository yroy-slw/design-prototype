import { useEffect, useRef } from 'react';

export function AppFooter() {
  const footerRef = useRef<any>(null);

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
    <div style={{ width: '100%' }}>
      <ge-footer ref={footerRef} />
    </div>
  );
}
