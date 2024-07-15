import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import { TextInput, FileInput } from "../../Components/Input/InputForm";
import FormButtons from "../../Components/Button";

const Edit = ({ user, showModal, setShowModal }) => {
    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        put(`/profile-user/${user.id}`, formData, {
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
            title="Edit user"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <TextInput
                        id="name"
                        label="Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
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
                        id="avatar"
                        label="Avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        error={errors.avatar}
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