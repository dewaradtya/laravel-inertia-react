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

const getCardColor = (nilai) => {
    if (nilai >= 85) return "bg-green-500";
    if (nilai <= 80) return "bg-red-500";
    return "bg-yellow-500";
};

export default function Nilai({ nilai, meta }) {
    const { flash, auth } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedNilai, setSelectedNilai] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [filterMapel, setFilterMapel] = useState("");
    const [searchNama, setSearchNama] = useState("");

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

        if (searchNama) {
            filteredData = filteredData.filter((item) =>
                item.siswa?.nama.toLowerCase().includes(searchNama.toLowerCase())
            );
        }

        filteredData.sort((a, b) => b.nilai - a.nilai);

        return filteredData;
    }, [nilai.data, filterMapel, searchNama]);

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

        if (auth.user && (auth.user.role === "admin" || auth.user.role === "pengajar")) {
            cols.push({
                label: "Action",
                name: "action",
                renderCell: (row) => (
                    <div className="flex space-x-2">
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
                    </div>
                ),
            });
        }

        return cols;
    }, [auth.user]);

    return (
        <Layout>
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black mb-4 sm:mb-0">Nilai Siswa</h1>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                        type="text"
                        placeholder="Cari Nama Siswa"
                        className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                        value={searchNama}
                        onChange={(e) => setSearchNama(e.target.value)}
                    />
                    <select
                        className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
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
                    {auth.user && (auth.user.role === "admin" || auth.user.role === "pengajar") && (
                        <Link
                            className="border bg-green-600 hover:bg-green-700 px-4 py-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm w-full sm:w-auto"
                            href="/nilai/create"
                        >
                            <span className="material-icons text-lg">add</span>
                            Nilai
                        </Link>
                    )}
                </div>
            </div>

            {auth.user && auth.user.role === "siswa" ? (
                <div>
                    <div className="mb-4 flex flex-wrap justify-start">
                        <p className="ml-2">
                            <span className="bg-green-500 p-2 rounded-lg inline-block mr-2"></span>
                            Nilai diatas KKM
                        </p>
                        <p className="ml-2">
                            <span className="bg-yellow-500 p-2 rounded-lg inline-block mr-2"></span>
                            Nilai KKM
                        </p>
                        <p className="ml-2">
                            <span className="bg-red-500 p-2 rounded-lg inline-block mr-2"></span>
                            Nilai dibawah KKM
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredNilai.map((item, index) => (
                            <div
                                key={index}
                                className={`${getCardColor(item.nilai)} p-4 rounded-lg shadow-md text-white`}
                            >
                                <h2 className="text-xl font-bold">{item.siswa?.nama || "N/A"}</h2>
                                <p className="mt-2">
                                    <span className="font-semibold">Mapel: </span>
                                    {item.mapel}
                                </p>
                                <p className="mt-2">
                                    <span className="font-semibold">Nilai: </span>
                                    {item.nilai}
                                </p>
                                <p className="mt-2">
                                    <span className="font-semibold">Tanggal: </span>
                                    {formatDate(item.created_at)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <Table columns={columns} rows={filteredNilai} />
            )}

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
