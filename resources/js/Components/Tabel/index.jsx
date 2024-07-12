import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Pagination from "../Pagination/index";
import Edit from "../../Pages/Siswa/edit";

export default function Table({ siswa, meta }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      router.delete(`/siswa/${id}`);
    }
  };

  const handleEditClick = (siswa) => {
    setSelectedSiswa(siswa);
    setShowEditModal(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-3xl shadow-md">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">No</th>
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">Kelas</th>
            <th className="py-3 px-4 text-left">Alamat</th>
            <th className="py-3 px-4 text-left">Tanggal Lahir</th>
            <th className="py-3 px-4 text-left">No. Telp</th>
            <th className="py-3 px-4 text-left">Foto</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {siswa.data.length === 0 && (
            <tr>
              <td colSpan={8} className="font-bold text-center py-3 px-4">
                Tidak ada data.
              </td>
            </tr>
          )}
          {siswa.data.map((s, index) => (
            <tr key={s.id} className="border-t border-gray-300">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{s.nama}</td>
              <td className="py-3 px-4">{s.kelas}</td>
              <td className="py-3 px-4">{s.alamat}</td>
              <td className="py-3 px-4">{s.tanggal_lahir}</td>
              <td className="py-3 px-4">{s.no_telp}</td>
              <td className="py-3 px-4">
                <img
                  src={s.foto ? `http://localhost:8000/storage/${s.foto}` : "/img/default.jpg"}
                  alt={s.nama}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleEditClick(s)}
                  className="text-blue-600 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
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

      {showEditModal && selectedSiswa && (
        <Edit siswa={selectedSiswa} showModal={showEditModal} setShowModal={setShowEditModal} />
      )}
    </div>
  );
}