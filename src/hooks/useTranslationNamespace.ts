import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * Load specific namespace with common namespace always included
 */
export function useTranslationNamespace(namespace: string) {
  const { t, i18n, ready } = useTranslation([namespace, 'common']);
  
  useEffect(() => {
    // Preload the namespace if not ready
    if (!ready) {
      i18n.loadNamespaces(namespace);
    }
  }, [i18n, namespace, ready]);

  return { t, i18n, ready };
}