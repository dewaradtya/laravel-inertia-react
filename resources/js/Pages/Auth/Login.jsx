import React, { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { TextInput, PasswordInput } from '../../Components/Input/InputForm';

function Login() {
    const { errors } = usePage().props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        router.post('/login', {
            email: email,
            password: password
        });
    };

    return (
        <>
            <Head title="Login" />
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md mt-16">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="p-6">
                            <h5 className="text-xl font-bold mb-4">LOGIN</h5>
                            <hr className="mb-6" />
                            <form onSubmit={handleLogin}>
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
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    LOGIN
                                </button>
                            </form>
                            <p className="mt-4 text-sm text-gray-600 text-center">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-purple-600 hover:underline">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
