"use client";

import { useEffect, useRef } from "react";

/**
 * Adds a fade-in-up animation to elements when they enter the viewport.
 * Uses IntersectionObserver for zero jank.
 */
export function useScrollAnimate<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Add initial class
    el.classList.add("section-enter");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("section-enter-active");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}