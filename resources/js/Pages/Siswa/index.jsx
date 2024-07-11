import Layout from "../../Layouts/Layout";
import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Table from "../../Components/Tabel/index";
import Edit from "../Siswa/edit";
import ImportModal from "./import";

export default function Siswa({ siswa }) {
    const { flash } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);

    const handleEditClick = (siswa) => {
        setSelectedSiswa(siswa);
        setShowEditModal(true);
    };

    const handleImport = (formData) => {
        console.log(formData);
        setShowImportModal(false); i
    };

    return (
        <Layout>
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">Data Siswa</h1>
                <div className="flex items-center space-x-2">
                    <button
                        className="border bg-blue-600 hover:bg-blue-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                        onClick={() => setShowImportModal(true)}
                    >
                        <span className="material-icons text-lg">file_upload</span>
                        Import Excel
                    </button>
                    <a
                        className="border bg-yellow-600 hover:bg-yellow-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                        href="/siswa-export"
                    >
                        <span className="material-icons text-lg">download</span>
                        Download
                    </a>
                    <Link
                        className="border bg-green-600 hover:bg-green-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                        href="/siswa/create"
                    >
                        <span className="material-icons text-lg">add</span>
                        Tambah Data
                    </Link>
                </div>
            </div>
            <Table
                siswa={siswa}
                meta={siswa.meta}
                onEditClick={handleEditClick}
            />
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
        </Layout>
    );
}
