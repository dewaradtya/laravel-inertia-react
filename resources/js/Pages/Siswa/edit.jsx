import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from '../../Components/Modal';
import { TextInput, FileInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

const Edit = ({ siswa, showModal, setShowModal }) => {
    const { data, setData, put, errors } = useForm({
        nama: siswa.nama,
        kelas: siswa.kelas,
        alamat: siswa.alamat,
        tanggal_lahir: siswa.tanggal_lahir,
        no_telp: siswa.no_telp,
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        put(`/siswa/${siswa.id}`, formData, {
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
        <Modal title="Edit Siswa" showModal={showModal} setShowModal={setShowModal}>
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
                        id="kelas"
                        label="Kelas"
                        name="kelas"
                        value={data.kelas}
                        onChange={handleChange}
                        error={errors.kelas}
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