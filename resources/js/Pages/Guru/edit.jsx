import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from '../../Components/Modal';
import { TextInput, FileInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

const Edit = ({ guru, showModal, setShowModal }) => {
    const { data, setData, put, errors } = useForm({
        nama: guru.nama,
        mapel: guru.mapel,
        alamat: guru.alamat,
        tanggal_lahir: guru.tanggal_lahir,
        no_telp: guru.no_telp,
        email: guru.email,
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        put(`/guru/${guru.id}`, formData, {
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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData(name, files[0]);
    };
    

    return (
        <Modal title="Edit guru" showModal={showModal} setShowModal={setShowModal}>
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <TextInput
                        id="nama"
                        label="Nama"
                        name="nama"
                        value={data.nama}
                        onChange={handleChange}
                        error={errors.nama}
                    />
                    <TextInput
                        id="mapel"
                        label="Mapel"
                        name="mapel"
                        value={data.mapel}
                        onChange={handleChange}
                        error={errors.mapel}
                    />
                    <TextInput
                        id="alamat"
                        label="Alamat"
                        name="alamat"
                        value={data.alamat}
                        onChange={handleChange}
                        error={errors.alamat}
                    />
                    <TextInput
                        id="tanggal_lahir"
                        label="Tanggal Lahir"
                        name="tanggal_lahir"
                        value={data.tanggal_lahir}
                        onChange={handleChange}
                        error={errors.tanggal_lahir}
                        placeholder="YYYY-MM-DD"
                    />
                    <TextInput
                        id="no_telp"
                        label="No. Telp"
                        name="no_telp"
                        value={data.no_telp}
                        onChange={handleChange}
                        error={errors.no_telp}
                    />
                    <TextInput
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FileInput
                        id="foto"
                        label="Foto"
                        name="foto"
                        onChange={handleFileChange}
                        error={errors.foto}
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