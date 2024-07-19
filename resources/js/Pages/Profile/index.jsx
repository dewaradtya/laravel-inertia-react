import React, { useState, useMemo } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import Table from "../../Components/Tabel/index";
import Edit from "../Profile/edit";
import Pagination from "../../Components/Pagination/index";

export default function ProfileUser({ users }) {
    const { flash } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/profile/${id}`);
        }
    };

    const columns = useMemo(() => [
        { label: "No", name: "no", renderCell: (_, index) => index + 1 },
        { label: "Nama", name: "name" },
        { label: "Email", name: "email" },
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
    ], []);

    return (
        <Layout>
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">Data User</h1>
            </div>
            <Table columns={columns} rows={users.data} />
            <div className="mt-4">
                <Pagination meta={users.meta} />
            </div>
            {showEditModal && selectedUser && (
                <Edit
                    user={selectedUser}
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                />
            )}
        </Layout>
    );
}