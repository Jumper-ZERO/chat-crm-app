import { useState } from "react";

import { columns } from "./columns";

// import { DataTableRoundedCorner } from "@/components/table/data-table-rounded-corner";
import { DataTableWithResizableColumns } from "@/components/table/data-table-with-resizable-columns";
import { useContacts } from "@/hooks/use-contacts";

export const ContactTable = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useContacts(page, 10);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-zinc-900 border m-5 p-5">
      <DataTableWithResizableColumns
        columns={columns}
        data={data?.items ?? []}
        meta={
          data?.meta ?? {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: 10,
            totalPages: 0,
            currentPage: page,
          }
        }
        onPageChange={setPage}
      />
    </div>
  );
};
