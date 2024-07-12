import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextInput, FileInput, PasswordInput } from '../../Components/Input/InputForm';

export default function Profile({ user }) {
    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('profile.update'));
    };

    const handleFileChange = (e) => {
        setData('avatar', e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    id="name"
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />
                <TextInput
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
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
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                />
                <PasswordInput
                    id="password_confirmation"
                    label="Confirm Password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />
                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
}
