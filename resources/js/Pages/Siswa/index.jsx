import React, { useState, useMemo } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import Table from "../../Components/Tabel/index";
import Edit from "../Siswa/edit";
import ImportModal from "./import";
import Pagination from "../../Components/Pagination/index";

export default function Siswa({ siswa, userRole }) {
    const { flash, auth } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);
    const [identity, setIdentity] = useState("");
    const [identityDetails, setIdentityDetails] = useState(null);

    const handleEditClick = (siswa) => {
        setSelectedSiswa(siswa);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/siswa/${id}`);
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
            { label: "Kelas", name: "kelas" },
            { label: "Alamat", name: "alamat" },
            { label: "Tanggal Lahir", name: "tanggal_lahir" },
            { label: "No. Telp", name: "no_telp" },
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

    const handleViewIdentity = () => {
        const detail = siswa.data.find(
            (s) => s.nama.toLowerCase() === identity.toLowerCase()
        );
        if (detail) {
            setIdentityDetails(detail);
        } else {
            alert("Identitas tidak ditemukan");
            setIdentityDetails(null);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                    <h1 className="font-bold text-2xl text-black mb-2 lg:mb-0">
                        Data Siswa
                    </h1>
                    {auth.user && auth.user.role === "admin" && (
                        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
                            <button
                                className="border bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                                onClick={() => setShowImportModal(true)}
                            >
                                <span className="material-icons text-lg">
                                    file_upload
                                </span>
                                Import Excel
                            </button>
                            <a
                                className="border bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                                href="/siswa-export"
                            >
                                <span className="material-icons text-lg">
                                    download
                                </span>
                                Download
                            </a>
                            <Link
                                className="border bg-green-600 hover:bg-green-700 px-4 py-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                                href="/siswa/create"
                            >
                                <span className="material-icons text-lg">
                                    add
                                </span>
                                Tambah Data
                            </Link>
                        </div>
                    )}
                </div>
                {auth.user && auth.user.role === "admin" ? (
                    <>
                        <Table columns={columns} rows={siswa.data} />
                        <div className="mt-4">
                            <Pagination meta={siswa.meta} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            value={identity}
                            onChange={(e) => setIdentity(e.target.value)}
                            placeholder="Masukkan nama lengkap "
                            className="border-b border-gray-800 px-4 py-2 mb-2 focus:outline-none w-full max-w-sm"
                        />
                        <button
                            onClick={handleViewIdentity}
                            className="material-icons bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mb-4"
                        >
                            search
                        </button>
                        {identityDetails && (
                            <div className="p-4 border rounded-3xl bg-yellow-300 shadow-md w-full max-w-md text-gray-700">
                                <div className="flex flex-col lg:flex-row items-center">
                                    <img
                                        src={
                                            identityDetails.foto
                                                ? `http://localhost:8000/storage/${identityDetails.foto}`
                                                : "/img/default.jpg"
                                        }
                                        alt={identityDetails.nama}
                                        className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mb-4 lg:mb-0 lg:mr-4"
                                    />
                                    <div>
                                        <p className="text-md">
                                            <strong>Nama:</strong>{" "}
                                            {identityDetails.nama}
                                        </p>
                                        <p className="text-md">
                                            <strong>Kelas:</strong>{" "}
                                            {identityDetails.kelas}
                                        </p>
                                        <p className="text-md">
                                            <strong>Alamat:</strong>{" "}
                                            {identityDetails.alamat}
                                        </p>
                                        <p className="text-md">
                                            <strong>Tanggal Lahir:</strong>{" "}
                                            {identityDetails.tanggal_lahir}
                                        </p>
                                        <p className="text-md">
                                            <strong>No. Telp:</strong>{" "}
                                            {identityDetails.no_telp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {showEditModal && selectedSiswa && (
                    <Edit
                        siswa={selectedSiswa}
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                    />
                )}
                <ImportModal
                    showModal={showImportModal}
                    setShowModal={setShowImportModal}
                    onImport={handleImport}
                />
            </div>
        </Layout>
    );
}
