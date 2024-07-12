import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from '../../Components/Modal';
import { TextInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

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
                    <FormButtons
                        saveLabel="Simpan" 
                        cancelLabel="Batal" 
                        saveAction={handleSubmit} 
                        cancelLink="#" 
                    />
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Edit;