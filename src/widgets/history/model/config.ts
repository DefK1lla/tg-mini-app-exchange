import { Exchange } from '@/entities/exchange'
import { prop } from 'ramda'
import { TableColumn } from 'react-data-table-component'
export const columns = (): TableColumn<Exchange>[] => [
  {
    name: 'ID',
    selector: prop('id')
  },
  {
    name: 'Rate',
    selector: prop('rate')
  },
  {
    name: 'Crated at',
    selector: prop('createdAt')
  }
]
