import { RefObject, useRef, useEffect } from "react";

const useObserver = (onDetectEvent: () => void): RefObject<any> => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target);
            onDetectEvent();
            observer.observe(e.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(ref.current as Element);
    }
    return () => observer.disconnect();
  }, [ref]);
  return ref;
};

export default useObserver;
