import React, { useState, useMemo } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import Table from "../../Components/Tabel/index";
import Edit from "../Guru/edit";
import ImportModal from "../Siswa/import";
import Pagination from "../../Components/Pagination/index";

export default function Guru({ guru, meta }) {
    const { flash } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGuru, setSelectedGuru] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);

    const handleEditClick = (guru) => {
        setSelectedGuru(guru);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/guru/${id}`);
        }
    };

    const handleImport = (formData) => {
        console.log(formData);
        setShowImportModal(false);
    };

    const columns = useMemo(
        () => [
            { label: "No", name: "no", renderCell: (_, index) => index + 1 },
            { label: "Nama", name: "nama" },
            { label: "Mapel", name: "mapel" },
            { label: "Tgl Lahir", name: "tanggal_lahir" },
            { label: "Alamat", name: "alamat" },
            { label: "No. Telp", name: "no_telp" },
            { label: "Email", name: "email" },
            {
                label: "Foto",
                name: "foto",
                renderCell: (row) => (
                    <img
                        src={
                            row.foto
                                ? `http://localhost:8000/storage/${row.foto}`
                                : "/img/default.jpg"
                        }
                        alt={row.nama}
                        className="w-10 h-10 object-cover rounded-full"
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
        <Layout>
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">Data Guru</h1>
                <div className="flex items-center space-x-2">
                    <button
                        className="border bg-blue-600 hover:bg-blue-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                        onClick={() => setShowImportModal(true)}
                    >
                        <span className="material-icons text-lg">
                            file_upload
                        </span>
                        Import Excel
                    </button>
                    <a
                        className="border bg-yellow-600 hover:bg-yellow-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                        href="/guru-export"
                    >
                        <span className="material-icons text-lg">download</span>
                        Download
                    </a>
                    <Link
                        className="border bg-green-600 hover:bg-green-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                        href="/guru/create"
                    >
                        <span className="material-icons text-lg">add</span>
                        Tambah Data
                    </Link>
                </div>
            </div>
            <Table columns={columns} rows={guru.data} />
            <div className="mt-4">
                <Pagination meta={guru.meta} />
            </div>
            {showEditModal && selectedGuru && (
                <Edit
                    guru={selectedGuru}
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                />
            )}
            <ImportModal
                showModal={showImportModal}
                setShowModal={setShowImportModal}
                onImport={handleImport}
            />
        </Layout>
    );
}