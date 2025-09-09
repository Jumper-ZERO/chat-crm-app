import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Badge } from "@/components/ui/badge";
import { formatPhone } from "@/lib/phone";
import type { Contact } from "@/models/contact.model";

// export const columns: ColumnDef<Contact>[] = [
//   {
//     accessorKey: "name",
//     header: "Nombre",
//   },
//   {
//     accessorKey: "phone",
//     header: "Teléfono",
//     cell: ({ row }) => <p>{formatPhone(row.getValue("phone"))}</p>,
//   },
//   {
//     accessorKey: "customerStatus",
//     header: "Estado",
//     cell: ({ row }) => {
//       const status = row.getValue(
//         "customerStatus"
//       ) as Contact["customerStatus"];
//       const colorMap: Record<Contact["customerStatus"], string> = {
//         new: "bg-cyan-700",
//         active: "bg-emerald-500",
//         inactive: "text-gray-500",
//         blocked: "text-red-600",
//       };
//       return (
//         <Badge className={`${colorMap[status]} text-white font-bold`}>
//           {status}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "source",
//     header: "Origen",
//     cell: ({ row }) => <p className="capitalize">{row.getValue("source")}</p>,
//   },
//   {
//     accessorKey: "assignedTo",
//     header: "Asignacion",
//     cell: ({ row }) => {
//       const assigned = row.getValue("assignedTo") as { username: string };
//       return <p className="capitalize">{assigned.username}</p>;
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Creado",
//     cell: ({ row }) => (
//       <p className="capitalize">
//         {dayjs(row.getValue("createdAt")).locale("es").format("MMMM D, YYYY")}
//       </p>
//     ),
//   },
// ];

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => formatPhone(row.getValue("phone")),
  },
  {
    accessorKey: "customerStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "customerStatus"
      ) as Contact["customerStatus"];
      const colorMap: Record<Contact["customerStatus"], string> = {
        new: "bg-cyan-700",
        active: "bg-emerald-500",
        inactive: "text-gray-500",
        blocked: "text-red-600",
      };
      return (
        <Badge className={`${colorMap[status]} text-white font-bold`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "assignedTo.username",
    header: "Asignacion",
    cell: ({ row }) => row.original.assignedTo?.username ?? "Unassigned",
  },
  {
    accessorKey: "createdAt",
    header: "Creacion",
    cell: ({ row }) =>
      dayjs(row.getValue("createdAt")).locale("es").format("MMMM D, YYYY"),
  },
];
