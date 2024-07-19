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
                            className="material-icons text-white p-1 rounded-lg bg-blue-500 hover:bg-blue-700"
                        >
                            edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.id)}
                            className="material-icons text-white p-1 rounded-lg bg-red-500 hover:bg-red-700 ml-2"
                        >
                            delete
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