/** Runs `fn` when the browser is idle, or soon after load where requestIdleCallback is missing (Safari). Returns a cancel. */
export function whenIdle(fn: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(fn, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 200);
  return () => clearTimeout(id);
}
