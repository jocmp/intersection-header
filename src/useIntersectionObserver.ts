import { useEffect, useState, useRef, useCallback, MutableRefObject } from 'react';

const options: Partial<IntersectionObserver> = {
  rootMargin: '0px',
  root: null,
  thresholds: [1],
};

export function useIntersectionObserver() {
  const isSupported =
    ('IntersectionObserver' in window) &&
    ('IntersectionObserverEntry' in window);

  const trackedRef: MutableRefObject<HTMLElement | null> = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observer = useRef<any>(null);

  const setTrackedRef = useCallback((ref: any) => {
    trackedRef.current = ref;
  }, []);

  useEffect(() => {
    if (!isSupported) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(
      ([observerEntry]) => setEntry(observerEntry),
      options,
    );

    if (trackedRef.current) observer.current.observe(trackedRef.current);

    return () => observer.current.disconnect();
  }, [isSupported]);

  return {
    trackedRef,
    setTrackedRef,
    entry,
  };
}
