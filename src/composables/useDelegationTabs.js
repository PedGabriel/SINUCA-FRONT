import { ref } from 'vue'

// Abas da página de Delegação.
// O estado fica FORA da função (módulo) para ser compartilhado entre
// a sidebar (desktop), o NavigationComponent e a DelegationView.
export const delegationTabs = [
  { id: 0, icon: 'mdi mdi-view-grid-outline', name: 'Kanban' },
  { id: 1, icon: 'mdi mdi-calendar-month-outline', name: 'Cronograma' },
  { id: 2, icon: 'mdi mdi-file-document-outline', name: 'Documentos' },
  { id: 3, icon: 'mdi mdi-star-outline', name: 'Notas' },
]

const activeTab = ref(0)

export function useDelegationTabs() {
  const setTab = (id) => {
    activeTab.value = id
  }

  return { tabs: delegationTabs, activeTab, setTab }
}