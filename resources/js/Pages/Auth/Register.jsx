import React, { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { TextInput, PasswordInput } from '../../Components/Input/InputForm';

function Register() {
    const { errors } = usePage().props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const storeRegister = async (e) => {
        e.preventDefault();
        router.post('/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        });
    };

    return (
        <>
            <Head title="Register Account" />
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md mt-16">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="p-6">
                            <h5 className="text-xl font-bold mb-4">REGISTER</h5>
                            <hr className="mb-6" />
                            <form onSubmit={storeRegister}>
                                <TextInput
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={errors.name}
                                    placeholder="Full Name"
                                />
                                <TextInput
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={errors.email}
                                    placeholder="Email Address"
                                />
                                <PasswordInput
                                    id="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={errors.password}
                                    placeholder="Password"
                                />
                                <PasswordInput
                                    id="password_confirmation"
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder="Password Confirmation"
                                />
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    REGISTER
                                </button>
                            </form>
                            <p className="mt-4 text-sm text-black text-center">
                                Already have an account?{' '}
                                <Link href="/login" className="text-purple-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;