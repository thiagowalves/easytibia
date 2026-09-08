/**
 * Abre um link externo no navegador do sistema.
 *
 * No app Tauri, um `<a target="_blank">` comum não abre o navegador — ele
 * tenta navegar a própria janela. Aqui usamos o plugin `opener`; no
 * navegador (dev), cai no `window.open`.
 */
export async function openExternal(url: string): Promise<void> {
  try {
    const { openUrl } = await import("@tauri-apps/plugin-opener");
    await openUrl(url);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/**
 * Intercepta cliques em qualquer `<a href="http...">` da página e manda para
 * o navegador do sistema. Chamar uma vez, na inicialização.
 */
export function installExternalLinkHandler(): void {
  document.addEventListener(
    "click",
    (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (/^https?:\/\//i.test(href)) {
        e.preventDefault();
        void openExternal(href);
      }
    },
    true,
  );
}
