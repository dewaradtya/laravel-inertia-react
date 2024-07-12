import React from "react";

const Table = ({ columns, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-3xl shadow-md">
        <TableHead columns={columns} />
        <TableBody columns={columns} rows={rows} />
      </table>
    </div>
  );
};

const TableHead = ({ columns }) => (
  <thead className="bg-gray-600 text-white">
    <tr>
      {columns.map((column) => (
        <th key={column.label} className="py-3 px-4 text-left">
          {column.label}
        </th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ columns, rows }) => (
  <tbody>
    {rows.length === 0 ? (
      <tr>
        <td colSpan={columns.length} className="font-bold text-center py-3 px-4">
          Tidak ada data.
        </td>
      </tr>
    ) : (
      rows.map((row, index) => (
        <tr key={row.id} className="border-t border-gray-300">
          {columns.map((column) => (
            <td key={column.name} className="py-3 px-4">
              {column.renderCell ? column.renderCell(row, index) : row[column.name]}
            </td>
          ))}
        </tr>
      ))
    )}
  </tbody>
);

export default Table;