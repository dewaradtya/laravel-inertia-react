import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from '../../Components/Modal';

const Edit = ({ siswa, showModal, setShowModal }) => {
    const { data, setData, put, errors } = useForm({
        nis: siswa.nis,
        nama: siswa.nama,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/siswa/${siswa.id}`, {
            onSuccess: () => {
                console.log("Data berhasil diperbarui!");
                setShowModal(false);
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <Modal title="Edit Siswa" showModal={showModal} setShowModal={setShowModal}>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nis" className="block text-sm font-medium text-gray-700">
                            NIS
                        </label>
                        <input
                            id="nis"
                            type="text"
                            name="nis"
                            value={data.nis}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.nis
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-purple-600"
                            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm`}
                        />
                        {errors.nis && (
                            <p className="mt-1 text-sm text-red-500">{errors.nis}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            id="nama"
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.nama
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-purple-600"
                            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm`}
                        />
                        {errors.nama && (
                            <p className="mt-1 text-sm text-red-500">{errors.nama}</p>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mr-2"
                >
                    Simpan
                </button>
                <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Batal
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default Edit;