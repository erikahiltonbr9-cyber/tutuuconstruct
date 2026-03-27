import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations
 * 
 * @param options - Configuration options for Intersection Observer
 * @returns ref and isVisible state
 * 
 * @example
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
 * 
 * <div ref={ref} className={`scroll-slide-up ${isVisible ? 'is-visible' : ''}`}>
 *   Content that animates on scroll
 * </div>
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

/**
 * Hook for multiple elements with staggered animations
 * 
 * @example
 * const { refs, areVisible } = useStaggeredScrollAnimation(3);
 * 
 * {items.map((item, index) => (
 *   <div
 *     key={index}
 *     ref={refs[index]}
 *     className={`scroll-fade-in ${areVisible[index] ? 'is-visible' : ''}`}
 *   >
 *     {item}
 *   </div>
 * ))}
 */
export const useStaggeredScrollAnimation = (count: number, delay: number = 100) => {
  const refs = useRef<(HTMLDivElement | null)[]>(Array(count).fill(null));
  const [areVisible, setAreVisible] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    const observers = refs.current.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setAreVisible((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * delay);
            observer.unobserve(element);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [count, delay]);

  return {
    refs: refs.current.map((_, index) => (el: HTMLDivElement | null) => {
      refs.current[index] = el;
    }),
    areVisible,
  };
};
