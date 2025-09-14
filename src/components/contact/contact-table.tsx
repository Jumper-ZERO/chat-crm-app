// src/components/contact/contact-table.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { useColumns } from "./contact-table-columns";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useContacts } from "@/hooks/use-contacts";
import { useDataTable } from "@/hooks/use-data-table";
import type { Contact } from "@/models/contact.model";

export function ContactTable() {
  const columns = useColumns();
  const { data, isLoading } = useContacts();
  const items = useMemo(() => data?.items ?? [], [data?.items]);

  return (
    <div className="data-table-container">
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
  );
}

// Skeleton loading
const ContactTableSkeleton = ({
  columns,
}: {
  columns: ColumnDef<Contact>[];
}) => (
  <DataTableSkeleton
    columnCount={columns.length}
    filterCount={2}
    cellWidths={Array(columns.length).fill("2rem")}
    shrinkZero
  />
);

// Principal Table
const ContactTableContent = ({
  data,
  columns,
  pageCount,
  columnPinning = { right: ["actions"] }, // escaling option
}: {
  data: Contact[];
  columns: ColumnDef<Contact>[];
  pageCount: number;
  columnPinning?: { left?: string[]; right?: string[] };
}) => {
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: { columnPinning },
    getRowId: (row: Contact) => row.id.toString(),
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
};
