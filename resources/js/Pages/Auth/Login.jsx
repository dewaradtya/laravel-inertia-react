import React, { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';

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
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full px-3 py-2 border ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        className={`mt-1 block w-full px-3 py-2 border ${
                                            errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>
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