import { ref, onMounted, onUnmounted } from 'vue'

// Ponto de corte entre "mobile/tablet" e "desktop".
// Se mudar aqui, mude também os @media (min-width: 1024px) dos componentes.
export const DESKTOP_QUERY = '(min-width: 1024px)'

/**
 * Retorna um ref reativo que é `true` quando a tela é >= 1024px.
 * Usado pelo AppLayout (sidebar x header/footer) e pelo NavigationComponent.
 */
export function useIsDesktop() {
  const mql = window.matchMedia(DESKTOP_QUERY)
  const isDesktop = ref(mql.matches)

  const onChange = (e) => {
    isDesktop.value = e.matches
  }

  onMounted(() => mql.addEventListener('change', onChange))
  onUnmounted(() => mql.removeEventListener('change', onChange))

  return isDesktop
}