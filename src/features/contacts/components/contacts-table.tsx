// src/components/contact/contact-table.tsx
import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { useContacts } from '@/hooks/use-contacts'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { DataTableBulkActions } from '@/features/contacts/components/data-table-bulk-actions'
import type { Contact } from '@/features/contacts/data/schema'
import { useColumns } from './contacts-columns'

export function ContactTable() {
  const columns = useColumns()
  const { data, isLoading } = useContacts()
  const items = useMemo(() => data?.items ?? [], [data?.items])

  return (
    <div className='data-table-container'>
      {isLoading ? (
        <ContactTableSkeleton columns={columns} />
      ) : (
        <ContactTableContent
          data={items}
          columns={columns}
          pageCount={data?.meta?.totalPages ?? 0}
        />
      )}
    </div>
  )
}

// Skeleton loading
const ContactTableSkeleton = ({
  columns,
}: {
  columns: ColumnDef<Contact>[]
}) => (
  <DataTableSkeleton
    columnCount={columns.length}
    filterCount={2}
    cellWidths={Array(columns.length).fill('2rem')}
    shrinkZero
  />
)

// Principal Table
const ContactTableContent = ({
  data,
  columns,
  pageCount,
  columnPinning = { right: ['actions'] }, // escaling option
}: {
  data: Contact[]
  columns: ColumnDef<Contact>[]
  pageCount: number
  columnPinning?: { left?: string[]; right?: string[] }
}) => {
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: { columnPinning },
    getRowId: (row: Contact) => row.id.toString(),
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
      <DataTableBulkActions table={table} />
    </DataTable>
  )
}
