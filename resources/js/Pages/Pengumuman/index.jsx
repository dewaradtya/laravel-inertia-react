import React, { useState } from 'react';
import { Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import TableView from "./tableView";
import CardView from "./card";
import Edit from "./edit";
import ImportModal from "../Guru/import";
import Pagination from "../../Components/Pagination/index";

export default function Pengumuman({ pengumuman }) {
    const { flash, auth } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPengumuman, setSelectedPengumuman] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);

    const handleEditClick = (pengumuman) => {
        setSelectedPengumuman(pengumuman);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/pengumuman/${id}`);
        }
    };

    const handleImport = (formData) => {
        console.log(formData);
        setShowImportModal(false);
    };

    return (
        <Layout>
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">
                    Pengumuman Sekolah
                </h1>
                <div className="flex items-center space-x-2">
                    {auth.user && auth.user.role === "admin" && (
                        <Link
                            className="border bg-green-600 hover:bg-green-700 px-4 p-2 rounded-3xl flex items-center space-x-2 text-white shadow-sm"
                            href="/pengumuman/create"
                        >
                            <span className="material-icons text-lg">add</span>
                            Tambah Data
                        </Link>
                    )}
                </div>
            </div>
            {auth.user && auth.user.role === "admin" ? (
                <TableView
                    pengumuman={pengumuman}
                    handleEditClick={handleEditClick}
                    handleDelete={handleDelete}
                />
            ) : (
                <CardView pengumuman={pengumuman} />
            )}
            <div className="mt-4">
                <Pagination meta={pengumuman.meta} />
            </div>
            {showEditModal && selectedPengumuman && (
                <Edit
                    pengumuman={selectedPengumuman}
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