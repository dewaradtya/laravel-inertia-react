import React from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '../../Components/Modal';
import { TextInput, FileInput, PasswordInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

const Profile = ({ user, showModal, setShowModal }) => {
    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        put(route('profile.update'), formData, {
            onSuccess: () => {
                console.log("Profil berhasil diperbarui!");
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
        <Modal title="Edit Profil" showModal={showModal} setShowModal={setShowModal}>
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
                        type="email"
                        name="email"
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
                    <PasswordInput
                        id="password"
                        label="Password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <PasswordInput
                        id="password_confirmation"
                        label="Confirm Password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={handleChange}
                    />
                    <FormButtons
                        saveLabel="Update Profile" 
                        cancelLabel="Cancel" 
                        saveAction={handleSubmit} 
                        cancelLink="#" 
                    />
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Profile;
