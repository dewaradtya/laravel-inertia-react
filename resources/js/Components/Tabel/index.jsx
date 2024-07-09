import React from "react";
import { Link, router } from "@inertiajs/react";
import Pagination from "../Pagination/index";
import EditModal from "../Modal/index";

export default function Table({ siswa, meta }) {
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      router.delete(`/siswa/${id}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-3xl shadow-md">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">No</th>
            <th className="py-3 px-4 text-left">Nis</th>
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {siswa.data.length === 0 && (
            <tr>
              <td colSpan={5} className="font-bold text-center py-3 px-4">
                Tidak ada data.
              </td>
            </tr>
          )}
          {siswa.data.map((s, index) => (
            <tr key={s.id} className="border-t border-gray-300">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{s.nis}</td>
              <td className="py-3 px-4">{s.nama}</td>
              <td className="py-3 px-4">
                <EditModal siswa={s} />
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <Pagination meta={meta} />
      </div>
    </div>
  );
}
