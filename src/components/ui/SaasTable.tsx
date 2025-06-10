import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface SaaSTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function SaaSTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage,
}: SaaSTableProps<T>) {
  if (isLoading) {
    return <div className="py-10 text-center text-gray-400">Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400">
        {emptyMessage || "No data found."}
      </div>
    );
  }

  return (
    <div className="border rounded-lg shadow bg-white overflow-hidden">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="p-4 text-left font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              {columns.map((col, j) => (
                <td key={j} className="p-4 align-middle">
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : (row[col.accessor] as any)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
