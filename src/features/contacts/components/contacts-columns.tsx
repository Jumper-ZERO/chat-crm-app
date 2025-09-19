import { useMemo } from 'react'
import type { ColumnDef, Column } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { Ban, CircleDashed, CircleDot, CirclePlus } from 'lucide-react'
import { formatPhone } from '@/lib/phone'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/features/contacts/components/data-table-row-actions'
import type { Contact } from '@/features/contacts/data/schema'

export const useColumns = (): ColumnDef<Contact>[] => {
  return useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Select all'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title='Nombre' />
        ),
        meta: {
          label: 'Nombre',
          placeholder: 'Buscar nombre...',
          variant: 'text',
        },
        enableColumnFilter: true,
      },
      {
        id: 'phone',
        accessorKey: 'phone',
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title='Telefono' />
        ),
        cell: ({ row }) => formatPhone(row.getValue('phone')),
        enableSorting: false,
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title='Estado' />
        ),
        cell: ({ cell }) => {
          const icons = {
            new: CirclePlus,
            active: CircleDot,
            inactive: CircleDashed,
            blocked: Ban,
          }
          const status = cell.getValue<Contact['status']>()
          const Icon = icons[status]
          return (
            <Badge variant='outline' className='p-1 capitalize'>
              {Icon && <Icon />}
              {status}
            </Badge>
          )
        },
        meta: {
          label: 'Estado',
          variant: 'multiSelect',
          options: [
            { label: 'Nuevo', value: 'new' },
            { label: 'Activo', value: 'active' },
            { label: 'Inactivo', value: 'inactive' },
            { label: 'Bloqueado', value: 'blocked' },
          ],
        },
        enableColumnFilter: true,
        enableSorting: false,
      },
      {
        id: 'assignedTo',
        accessorFn: (row) => row.assignedTo?.username ?? 'Unassigned',
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader
            column={column}
            key={column.getIndex()}
            title='Asignado'
          />
        ),
        cell: ({ row }) => row.original?.assignedTo?.username ?? 'Unassigned',
        meta: {
          label: 'Asignado',
          variant: 'text',
        },
      },
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title='Creación' />
        ),
        cell: ({ cell }) =>
          dayjs(cell.getValue<Contact['createdAt']>())
            .locale('es')
            .format('MMMM D, YYYY'),
      },
      {
        id: 'actions',
        cell: DataTableRowActions,
        size: 16,
      },
    ],
    []
  )
}
