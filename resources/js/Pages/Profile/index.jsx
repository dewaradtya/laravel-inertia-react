import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Pagination from "../../Components/Pagination/index";
import Layout from "../../Layouts/Layout";

const Index = ({ users, meta }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(`/siswa/${id}`);
        }
    };

    const handleEditClick = (siswa) => {
        setSelectedSiswa(siswa);
        setShowEditModal(true);
    };
    return (
        <Layout>
            <div>
                <h1 className="font-bold text-3xl mb-4">User Profiles</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-3xl shadow-md">
                        <thead className="bg-gray-600 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">No</th>
                                <th className="py-3 px-4 text-left">Nama</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Role</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-gray-300"
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{item.name}</td>
                                    <td className="py-3 px-4">{item.email}</td>
                                    <td className="py-3 px-4">{item.role}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleEditClick(s)}
                                            className="text-blue-600 hover:text-blue-700 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s.id)}
                                            className="text-red-600 hover:text-red-700 ml-2"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <Pagination meta={meta} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;
