"use client";

import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, ArrowUpDown, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteWeighing, fetchWeighingsForHistory } from "@/lib/weighings";
import { ReactNode } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function WeightTable() {
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([
    {
      id: "date",
      desc: true,
    },
  ]);

  const handlePageSizeChange = (newPageSize: string) => {
    setPagination({
      pageIndex: 0,
      pageSize: +newPageSize,
    });
  };

  const {
    data = { entries: [], pages: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weighings", { sorting, pagination }],
    queryFn: () =>
      fetchWeighingsForHistory({ data: { sort: sorting, pagination } }),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteWeighing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weighings"] });
      queryClient.invalidateQueries({
        queryKey: ["weighing"],
      });
      setEntryToDelete(null);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate({ data: { id } });
  };

  const columns = [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return <div>{format(date, "MMM d, yyyy")}</div>;
      },
    },
    {
      accessorKey: "weight",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Weight (kg)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, table }) => {
        const weight = Number.parseFloat(row.getValue("weight"));

        // Calculate change from previous entry
        const rowIndex = row.index;
        let changeIcon: ReactNode | null = null;
        let changeClass = "";

        if (rowIndex < table.getRowCount() - 1) {
          const prevWeight = Number.parseFloat(
            table.getRow(rowIndex + 1).getValue("weight")
          );
          const change = weight - prevWeight;

          if (change > 0) {
            changeIcon = <ArrowUp className="ml-1 h-4 w-4 text-red-500" />;
            changeClass = "text-red-500";
          } else if (change < 0) {
            changeIcon = <ArrowDown className="ml-1 h-4 w-4 text-green-500" />;
            changeClass = "text-green-500";
          }
        }

        return (
          <div className="flex items-center">
            <span className={changeClass}>{weight.toFixed(1)}</span>
            {changeIcon}
          </div>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => {
        const notes = row.getValue("notes");
        return <div className="max-w-[200px] truncate">{notes || "-"}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const entry = row.original;

        return (
          <AlertDialog
            open={entryToDelete === entry.id}
            onOpenChange={(open) => {
              if (!open) setEntryToDelete(null);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEntryToDelete(entry.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your weight entry from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(entry.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data.entries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    pageCount: data.pages,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading weight entries...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading weight entries
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Entries per page selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        {/* {totalEntries > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>
        )} */}
      </div>{" "}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No weight entries found. Add your first entry to get started!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
