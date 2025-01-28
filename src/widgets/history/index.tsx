import { ExchangesGate, fetchAllExchangesFx } from '@/entities/exchange'
import { ExchangeInfo } from '@/features/exchange'
import { Modal } from '@telegram-apps/telegram-ui'
import { useGate, useUnit } from 'effector-react'
import DataTable from 'react-data-table-component'
import { $selected, columns, setSelectedEv } from './model'

export const History = () => {
  const { selected, data = [] } = useUnit({
    selected: $selected,
    data: fetchAllExchangesFx.$data.map((d) => d?.exchanges)
  })
  useGate(ExchangesGate)

  return (
    <>
      <DataTable
        columns={columns()}
        data={data}
        onRowClicked={({ id }) => {}}
      />
      <Modal
        open={!!selected}
        onOpenChange={(open) => !open && setSelectedEv(null)}
      >
        <ExchangeInfo id={selected} />
      </Modal>
    </>
  )
}
