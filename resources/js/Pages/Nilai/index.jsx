import React, { useState, useMemo } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import Table from "../../Components/Tabel/index";
import ImportModal from "../Guru/import";
import Pagination from "../../Components/Pagination/index";
import Edit from "./edit";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function Nilai({ nilai, meta }) {
    const { flash, auth } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedNilai, setSelectedNilai] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [filterMapel, setFilterMapel] = useState("");

    const handleEditClick = (nilai) => {
        setSelectedNilai(nilai);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/nilai/${id}`);
        }
    };

    const handleImport = (formData) => {
        console.log(formData);
        setShowImportModal(false);
    };

    const uniqueMapels = useMemo(() => {
        const mapels = nilai.data.map((item) => item.mapel);
        return [...new Set(mapels)];
    }, [nilai.data]);

    const filteredNilai = useMemo(() => {
        let filteredData = nilai.data;

        if (filterMapel) {
            filteredData = filteredData.filter(
                (item) => item.mapel === filterMapel
            );
        }

        return filteredData;
    }, [nilai.data, filterMapel]);

    const columns = useMemo(() => {
        const cols = [
            { label: "No", name: "no", renderCell: (_, index) => index + 1 },
            {
                label: "Siswa",
                name: "siswa",
                renderCell: (row) => row.siswa?.nama || "N/A",
            },
            { label: "Mapel", name: "mapel" },
            { label: "Nilai", name: "nilai" },
            {
                label: "Tanggal",
                name: "tanggal",
                renderCell: (row) => formatDate(row.created_at),
            },
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
            });
        }

        return cols;
    }, [auth.user]);

    return (
        <Layout>
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">Nilai </h1>
                <div className="flex items-center space-x-2">
                    <div>
                        <select
                            className="border border-gray-300 rounded-md p-2"
                            value={filterMapel}
                            onChange={(e) => setFilterMapel(e.target.value)}
                        >
                            <option value="">Mapel</option>
                            {uniqueMapels.map((mapel, index) => (
                                <option key={index} value={mapel}>
                                    {mapel}
                                </option>
                            ))}
                        </select>
                    </div>
                    {auth.user &&
                        (auth.user.role === "admin" ||
                            auth.user.role === "pengajar") && (
                            <Link
                                className="border bg-green-600 hover:bg-green-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                                href="/nilai/create"
                            >
                                <span className="material-icons text-lg">
                                    add
                                </span>
                                Nilai
                            </Link>
                        )}
                </div>
            </div>
            <Table columns={columns} rows={filteredNilai} />
            <div className="mt-4">
                <Pagination meta={meta} />
            </div>
            {showEditModal && selectedNilai && (
                <Edit
                    nilai={selectedNilai}
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
