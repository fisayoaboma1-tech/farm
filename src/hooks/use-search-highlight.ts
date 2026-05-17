const HIGHLIGHT_EVENT = "agro:highlight-product";

export function dispatchHighlight(productName: string) {
  window.dispatchEvent(
    new CustomEvent(HIGHLIGHT_EVENT, { detail: productName })
  );
}

export function subscribeHighlight(callback: (productName: string) => void) {
  const handler = (e: Event) => {
    callback((e as CustomEvent<string>).detail);
  };
  window.addEventListener(HIGHLIGHT_EVENT, handler);
  return () => window.removeEventListener(HIGHLIGHT_EVENT, handler);
}