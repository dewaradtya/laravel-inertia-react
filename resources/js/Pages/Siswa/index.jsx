import Layout from "../../Layouts/Layout";
import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Table from "../../Components/Tabel/index";
import Edit from "../Siswa/edit";

export default function Siswa({ siswa }) {
    const { flash } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);

    const handleEditClick = (siswa) => {
        setSelectedSiswa(siswa);
        setShowEditModal(true);
    };

    return (
        <Layout>
            <Head title="Siswa" />
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">Data Siswa</h1>
                <Link
                    className="border bg-green-500 hover:bg-green-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                    href="/siswa/create"
                >
                    <span className="material-icons text-lg">add</span>
                    Tambah Data
                </Link>
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
        </Layout>
    );
}
