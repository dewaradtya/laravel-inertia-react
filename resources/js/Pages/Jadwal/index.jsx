import React, { useState, useMemo, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import Table from "../../Components/Tabel/index";
import ImportModal from "../Guru/import";
import Pagination from "../../Components/Pagination/index";
import Edit from "./edit";

export default function Jadwal({ jadwal, meta }) {
    const { flash, auth } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [filterHari, setFilterHari] = useState(null);
    const [filterKelas, setFilterKelas] = useState(null);

    useEffect(() => {
        const uniqueKelas = [...new Set(jadwal.data.map(item => item.kelas))];
        setFilterKelasOptions(uniqueKelas);
    }, [jadwal.data]);

    const [filterKelasOptions, setFilterKelasOptions] = useState([]);

    const handleEditClick = (jadwal) => {
        setSelectedJadwal(jadwal);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/jadwal/${id}`);
        }
    };

    const handleImport = (formData) => {
        console.log(formData);
        setShowImportModal(false);
    };

    const filteredJadwal = useMemo(() => {
        let filteredData = jadwal.data;

        if (filterHari) {
            filteredData = filteredData.filter(item => item.hari === filterHari);
        }

        if (filterKelas) {
            filteredData = filteredData.filter(item => item.kelas === filterKelas);
        }

        return filteredData;
    }, [jadwal.data, filterHari, filterKelas]);

    const columns = useMemo(
        () => {
            const cols = [
                { label: "No", name: "no", renderCell: (_, index) => index + 1 },
                { label: "Kelas", name: "kelas" },
                { label: "Mapel", name: "mapel" },
                { label: "Guru", name: "guru", renderCell: (row) => row.guru?.nama || 'N/A' },
                { label: "Hari", name: "hari" },
                { label: "Jam Mulai", name: "jam_mulai" },
                { label: "Jam Selesai", name: "jam_selesai" },
            ];

            if (auth.user && (auth.user.role === "admin" || auth.user.role === "pengajar")) {
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
        },
        [auth.user]
    );

    return (
        <Layout>
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">Jadwal Pelajaran</h1>
                <div className="flex items-center space-x-2">
                    <div>
                        <select
                            className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2"
                            value={filterHari || ''}
                            onChange={(e) => setFilterHari(e.target.value || null)}
                        >
                            <option value="">Hari</option>
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jumat">Jumat</option>
                            <option value="Sabtu">Sabtu</option>
                        </select>
                        <select
                            className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={filterKelas || ''}
                            onChange={(e) => setFilterKelas(e.target.value || null)}
                        >
                            <option value="">Kelas</option>
                            {filterKelasOptions.map((kelas, index) => (
                                <option key={index} value={kelas}>{kelas}</option>
                            ))}
                        </select>
                    </div>
                    {auth.user && (auth.user.role === "admin" || auth.user.role === "pengajar") && (
                        <Link
                            className="border bg-green-600 hover:bg-green-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                            href="/jadwal/create"
                        >
                            <span className="material-icons text-lg">add</span>
                            Tambah Jadwal
                        </Link>
                    )}
                </div>
            </div>
            <Table columns={columns} rows={filteredJadwal} />
            <div className="mt-4">
                <Pagination meta={jadwal.meta} />
            </div>
            {showEditModal && selectedJadwal && (
                <Edit
                    jadwal={selectedJadwal}
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
