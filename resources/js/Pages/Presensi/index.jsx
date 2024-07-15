import React, { useState, useMemo } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import Table from "../../Components/Tabel/index";
import ImportModal from "../Guru/import";
import Pagination from "../../Components/Pagination/index";
import Edit from "./edit";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function Presensi({ presensi, meta }) {
    const { flash, auth } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPresensi, setSelectedPresensi] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [filterKeterangan, setFilterKeterangan] = useState("");

    const handleEditClick = (presensi) => {
        setSelectedPresensi(presensi);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/presensi/${id}`);
        }
    };

    const handleImport = (formData) => {
        console.log(formData);
        setShowImportModal(false);
    };

    const uniqueKeterangans = useMemo(() => {
        const keterangans = presensi.data.map((item) => item.keterangan);
        return [...new Set(keterangans)];
    }, [presensi.data]);

    const filteredPresensi = useMemo(() => {
        let filteredData = presensi.data;

        if (filterKeterangan) {
            filteredData = filteredData.filter(
                (item) => item.keterangan === filterKeterangan
            );
        }

        return filteredData;
    }, [presensi.data, filterKeterangan]);

    const columns = useMemo(() => {
        const cols = [
            { label: "No", name: "no", renderCell: (_, index) => index + 1 },
            {
                label: "Siswa",
                name: "siswa",
                renderCell: (row) => row.siswa?.nama || "N/A",
            },
            { label: "Keterangan", name: "keterangan" },
            { label: "Tanggal", name: "created_at", renderCell: (row) => formatDate(row.created_at) },
        ];

        if (
            auth.user &&
            (auth.user.role === "admin" || auth.user.role === "pengajar")
        ) {
            cols.push({
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
            });
        }

        return cols;
    }, [auth.user]);

    return (
        <Layout>
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">Presensi </h1>
                <div className="flex items-center space-x-2">
                    <div>
                        <select
                            className="border border-gray-300 rounded-md p-2"
                            value={filterKeterangan}
                            onChange={(e) => setFilterKeterangan(e.target.value)}
                        >
                            <option value="">Keterangan</option>
                            {uniqueKeterangans.map((keterangan, index) => (
                                <option key={index} value={keterangan}>
                                    {keterangan}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Link
                        className="border bg-green-600 hover:bg-green-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                        href="/presensi/create"
                    >
                        <span className="material-icons text-lg">add</span>
                        Presensi
                    </Link>
                </div>
            </div>
            <Table columns={columns} rows={filteredPresensi} />
            <div className="mt-4">
                <Pagination meta={meta} />
            </div>
            {showEditModal && selectedPresensi && (
                <Edit
                    presensi={selectedPresensi}
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
