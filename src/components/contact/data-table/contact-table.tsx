import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

import { columns } from "@/components/contact/contact-table-columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { Contact } from "@/models/contact.model";
import type { ContactQuery } from "@/models/contact.query";
import { Route } from "@/routes/(dashboard)/contacts/route";
import { getContacts } from "@/services/contact.service";

export function ContactTable() {
  const params = useSearch({ from: Route.id }) as ContactQuery;

  const { data, isLoading } = useQuery({
    queryKey: ["contacts", JSON.stringify(params)],
    queryFn: () => getContacts(params),
    placeholderData: keepPreviousData,
  });

  const items = data?.items ?? [];
  const pageCount = data?.meta.totalPages ?? 0;

  const { table } = useDataTable({
    data: items,
    columns,
    pageCount,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row: Contact) => row?.id?.toString(),
  });

  return (
    <div className="data-table-container">
      {isLoading ? (
        <DataTableSkeleton
          columnCount={8}
          filterCount={2}
          cellWidths={["2rem", "2rem", "2rem", "2rem", "2rem", "2rem", "2rem"]}
          shrinkZero
        />
      ) : (
        <DataTable table={table}>
          <DataTableToolbar table={table} />
        </DataTable>
      )}
    </div>
  );
}
