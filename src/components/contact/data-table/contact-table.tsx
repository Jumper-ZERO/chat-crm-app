import { useQuery } from "@tanstack/react-query";
import {
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  useQueryState,
} from "nuqs";

import { columns } from "@/components/contact/contact-table-columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { Contact } from "@/models/contact.model";
import { getContacts } from "@/services/contact.service";

export function ContactTable() {
  // Estado en la URL con nuqs
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("q", parseAsString.withDefault(""));
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // Fetch contactos
  const { data } = useQuery({
    queryKey: ["contacts", page, search, status],
    queryFn: () =>
      getContacts(page, 10, {
        search,
        status,
      }),
    placeholderData: (prev) => prev,
  });

  const { table } = useDataTable({
    data: data?.items ?? [],
    columns,
    pageCount: data?.meta.totalPages ?? 0,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row: Contact) => row?.id?.toString(),
  });

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}
