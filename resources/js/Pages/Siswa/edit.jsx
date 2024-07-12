import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from '../../Components/Modal';
import { TextInput } from '../../Components/Input/InputForm';

const Edit = ({ siswa, showModal, setShowModal }) => {
    const { data, setData, put, errors } = useForm({
        nis: siswa.nis,
        nama: siswa.nama,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/siswa/${siswa.id}`, data, {
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
                    <TextInput
                        id="nis"
                        label="NIS"
                        name="nis"
                        value={data.nis}
                        onChange={handleChange}
                        error={errors.nis}
                    />
                    <TextInput
                        id="nama"
                        label="Nama"
                        name="nama"
                        value={data.nama}
                        onChange={handleChange}
                        error={errors.nama}
                    />
                    <div className="flex justify-end">
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
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Edit;