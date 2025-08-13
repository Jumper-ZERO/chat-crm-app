import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/(dashboard)/contacts/")({
  component: RouteComponent,
});

const columns = [
  { key: "name", header: "Nombre" },
  { key: "whatsapp", header: "WhatsApp" },
  { key: "estate", header: "Estado" },
  {
    key: "actions",
    header: "Acciones",
    render: (row) => (
      <div className="flex gap-2">
        <button
          className="px-2 py bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => alert(`Chatear ${row.name}`)}
        >
          Watshapp
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => alert(`Editando ${row.name}`)}
        >
          Editar
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => alert(`Eliminando ${row.name}`)}
        >
          Eliminar
        </button>
      </div>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "Juan Alberto Pérez López",
    whatsapp: "+56 912345678",
    estate: "Pendiente",
  },
  {
    id: 2,
    name: "María Fernanda López Díaz",
    whatsapp: "+56 923456789",
    estate: "Completado",
  },
  {
    id: 3,
    name: "Luis Eduardo Torres Martínez",
    whatsapp: "+56 934567890",
    estate: "En proceso",
  },
  {
    id: 4,
    name: "Ana Beatriz García Herrera",
    whatsapp: "+56 945678901",
    estate: "Pendiente",
  },
  {
    id: 5,
    name: "Pedro Alejandro Sánchez Rojas",
    whatsapp: "+56 956789012",
    estate: "Cancelado",
  },
  {
    id: 6,
    name: "Sofía Isabel Martínez Castillo",
    whatsapp: "+56 967890123",
    estate: "Completado",
  },
  {
    id: 7,
    name: "Carlos Andrés Fernández Soto",
    whatsapp: "+56 978901234",
    estate: "En proceso",
  },
  {
    id: 8,
    name: "Valentina Carolina Rojas Morales",
    whatsapp: "+56 989012345",
    estate: "Pendiente",
  },
];

function RouteComponent() {
  const [search, setSearch] = React.useState("");
  const total = data.length;

  const filteredData = React.useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="p-8">
      {/* Encabezado y buscador en la misma fila */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          Contactos
          <span className="text-sm font-normal text-neutral-400">
            ({total} contactos)
          </span>
        </h1>

        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
