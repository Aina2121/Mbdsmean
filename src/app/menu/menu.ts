import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'list',
    title: 'Liste des Assignments',
    translate: 'Liste',
    type: 'item',
    icon: 'list',
    url: 'pages/list'
  },
  {
    id: 'add',
    title: 'Nouvel Assignment',
    translate: 'Ajouter',
    type: 'item',
    icon: 'file',
    url: 'pages/add'
  }
]
