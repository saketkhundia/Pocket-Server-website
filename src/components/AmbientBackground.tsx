/**
 * Fixed ambient layer: two faint static light fields and nothing else.
 * The background never moves — only the product does.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* soft light fields */}
      <div className="absolute left-1/2 top-[-30%] h-[46rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,10,14,0.05),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.035),transparent)]" />
      <div className="absolute bottom-[-30%] left-[8%] h-[36rem] w-[52rem] rounded-full bg-[radial-gradient(closest-side,rgba(10,10,14,0.04),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.028),transparent)]" />

      {/* bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white/50 to-transparent dark:from-black/50 dark:to-transparent" />
    </div>
  );
}
