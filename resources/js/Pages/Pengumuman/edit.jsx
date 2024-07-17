import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import { TextInput, FileInput } from "../../Components/Input/InputForm";
import FormButtons from "../../Components/Button";

const Edit = ({ pengumuman, showModal, setShowModal }) => {
    const { data, setData, put, errors } = useForm({
        judul: pengumuman.judul,
        isi: pengumuman.isi,
        foto: pengumuman.foto,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        put(`/pengumuman/${pengumuman.id}`, formData, {
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
        <Modal
            title="Edit pengumuman"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <TextInput
                        id="judul"
                        label="Judul"
                        name="judul"
                        value={data.judul}
                        onChange={handleChange}
                        error={errors.judul}
                    />
                    <TextInput
                        id="isi"
                        label="Isi"
                        name="isi"
                        value={data.isi}
                        onChange={handleChange}
                        error={errors.isi}
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
