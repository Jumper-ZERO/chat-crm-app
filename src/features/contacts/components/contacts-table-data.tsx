import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getContactsDataTable } from '@/services/contact.service'
import type { DataTableQuery } from '@/hooks/use-data-table'
import type { Contact } from '@/features/contacts/data/schema'
import { useColumns } from './contacts-columns'
import { ContactTable } from './contacts-table'
import { ContactTableSkeleton } from './contacts-table-skeleton'

export function ContactTableData() {
  const columns = useColumns()

  const [currentQuery, setCurrentQuery] = useState<DataTableQuery<Contact>>({
    page: 1,
    perPage: 10,
    sort: [],
  })

  const { data, isPending, isFetching } = useQuery({
    queryKey: ['contacts', 'table', currentQuery],
    queryFn: () => getContactsDataTable(currentQuery),
    placeholderData: (prev) => prev,
  })

  const items = useMemo(() => data?.items ?? [], [data?.items])
  const pageCount = data?.meta?.totalPages ?? -1
  const showSkeleton = isPending || (isFetching && items.length === 0)

  if (showSkeleton) {
    return <ContactTableSkeleton columns={columns} />
  }

  return (
    <ContactTable
      items={items}
      columns={columns}
      pageCount={pageCount}
      onQueryChange={setCurrentQuery}
    />
  )
}
