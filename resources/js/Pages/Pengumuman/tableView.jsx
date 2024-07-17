import React, { useMemo } from 'react';
import Table from '../../Components/Tabel/index';

const TableView = ({ pengumuman, handleEditClick, handleDelete }) => {
    const columns = useMemo(
        () => [
            { label: "No", name: "no", renderCell: (_, index) => index + 1 },
            { label: "Judul", name: "judul" },
            { label: "Isi", name: "isi" },
            {
                label: "Foto",
                name: "foto",
                renderCell: (row) => (
                    <img
                        src={`http://localhost:8000/storage/${row.foto}`}
                        alt={row.nama}
                        className="w-10 h-10 object-cover rounded"
                    />
                ),
            },
            {
                label: "Action",
                name: "action",
                renderCell: (row) => (
                    <>
                        <button
                            onClick={() => handleEditClick(row)}
                            className="text-blue-600 hover:text-blue-700 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600 hover:text-red-700 ml-2"
                        >
                            Hapus
                        </button>
                    </>
                ),
            },
        ],
        []
    );

    return (
        <Table columns={columns} rows={pengumuman.data} />
    );
};

export default TableView;