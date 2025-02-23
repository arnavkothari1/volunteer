import { Application } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "internship.title",
    header: "Position",
  },
  {
    accessorKey: "internship.company.name",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Applied Date",
  },
]; 