import type { ColumnDef, Column } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Ban,
  CircleDashed,
  CircleDot,
  CirclePlus,
  MoreHorizontal,
} from "lucide-react";
import { useMemo } from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPhone } from "@/lib/phone";
import { sourceContactValues, type Contact } from "@/models/contact.model";

export const useColumns = (): ColumnDef<Contact>[] => {
  return useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title="Nombre" />
        ),
        meta: {
          label: "Nombre",
          placeholder: "Buscar nombre...",
          variant: "text",
        },
        enableColumnFilter: true,
      },
      {
        id: "phone",
        accessorKey: "phone",
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title="Telefono" />
        ),
        cell: ({ row }) => formatPhone(row.getValue("phone")),
        meta: {
          label: "Celular",
          placeholder: "Buscar celular...",
          variant: "text",
        },
        enableColumnFilter: true,
      },
      {
        id: "customerStatus",
        accessorKey: "customerStatus",
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ cell }) => {
          const icons = {
            new: CirclePlus,
            active: CircleDot,
            inactive: CircleDashed,
            blocked: Ban,
          };
          const status = cell.getValue<Contact["customerStatus"]>();
          const Icon = icons[status];
          return (
            <Badge variant="outline" className="capitalize">
              <Icon />
              {status}
            </Badge>
          );
        },
        meta: {
          label: "Estado",
          variant: "multiSelect",
          options: [
            { label: "Nuevo", value: "new" },
            { label: "Activo", value: "active" },
            { label: "Inactivo", value: "inactive" },
            { label: "Bloqueado", value: "blocked" },
          ],
        },
        enableColumnFilter: true,
      },
      {
        id: "source",
        accessorKey: "source",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Origen" />
        ),
        meta: {
          label: "Origen",
          variant: "multiSelect",
          options: sourceContactValues.map((value) => ({
            label: value.charAt(0).toUpperCase() + value.slice(1),
            value,
          })),
        },
        enableColumnFilter: true,
      },
      {
        id: "assignedTo",
        accessorFn: (row) => row.assignedTo?.username ?? "Unassigned",
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader
            column={column}
            key={column.getIndex()}
            title="Asignado"
          />
        ),
        cell: ({ row }) => row.original?.assignedTo?.username ?? "Unassigned",
        meta: {
          label: "Asignado",
          variant: "text",
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }: { column: Column<Contact, unknown> }) => (
          <DataTableColumnHeader column={column} title="Creación" />
        ),
        cell: ({ cell }) =>
          dayjs(cell.getValue<Contact["createdAt"]>())
            .locale("es")
            .format("MMMM D, YYYY"),
      },
      {
        id: "actions",
        cell: function Cell() {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 32,
      },
    ],
    []
  );
};
