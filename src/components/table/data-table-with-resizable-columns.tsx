import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type PaginatedMeta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type DataTableWithResizableColumnsProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  /**
   * Meta de paginación del backend (nestjs-typeorm-paginate)
   * Si no se pasa, la paginación no se renderiza.
   */
  meta?: PaginatedMeta;
  /**
   * Cambia de página (1-indexed). Si no se pasa, la paginación no se renderiza.
   */
  onPageChange?: (page: number) => void;
  /**
   * Muestra un estado de carga en el body
   */
  isLoading?: boolean;
};

export function DataTableWithResizableColumns<TData, TValue>({
  data,
  columns,
  meta,
  onPageChange,
  isLoading,
}: DataTableWithResizableColumnsProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  function getPaginationRange(current: number, total: number, siblings = 1) {
    const range: Array<number | "dots"> = [];
    const start = Math.max(2, current - siblings);
    const end = Math.min(total - 1, current + siblings);

    range.push(1);
    if (start > 2) range.push("dots");
    for (let i = start; i <= end; i++) range.push(i);
    if (end < total - 1) range.push("dots");
    if (total > 1) range.push(total);
    return range;
  }

  const showPagination = Boolean(meta && onPageChange);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="group/head relative h-10 select-none last:[&>.cursor-col-resize]:opacity-0"
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanResize() && (
                      <div
                        onDoubleClick={() => header.column.resetSize()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="group-last/head:hidden absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px"
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="truncate">
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && meta && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (meta.currentPage > 1)
                    onPageChange?.(meta.currentPage - 1);
                }}
              />
            </PaginationItem>

            {getPaginationRange(meta.currentPage, meta.totalPages).map(
              (p, i) =>
                p === "dots" ? (
                  <PaginationItem key={`dots-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={meta.currentPage === p}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange?.(p as number);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (meta.currentPage < meta.totalPages)
                    onPageChange?.(meta.currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/** This is for debug data from pagination */}
      {/* {showPagination && (
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Page {meta?.currentPage} of {meta?.totalPages} · {meta?.itemsPerPage}{" "}
          per page · {meta?.totalItems} total
        </p>
      )} */}
    </div>
  );
}
