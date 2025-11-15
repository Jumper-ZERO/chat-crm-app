import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableRoundedCornerProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  onPageChange: (page: number) => void;
};

export function DataTableRoundedCorner<TData, TValue>({
  columns,
  data,
  meta,
  onPageChange,
}: DataTableRoundedCornerProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="capitalize">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                meta.currentPage > 1 && onPageChange(meta.currentPage - 1)
              }
            />
          </PaginationItem>

          {[...Array(meta.totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={meta.currentPage === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {meta.totalPages > 5 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                meta.currentPage < meta.totalPages &&
                onPageChange(meta.currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
