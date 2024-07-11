import React from "react";
import { Link, usePage, router } from "@inertiajs/react";

export default function Sidebar() {
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout', {}, {
            onSuccess: () => {
                console.log("Successfully logged out!");
            }
        });
    };

    return (
        <aside className="h-screen w-64 bg-purple-600 text-white border-r rounded-3xl border-blue-200 shadow-lg m-4">
            <div className="pt-8">
                <h1 className="text-2xl italic font-bold text-center mb-8">
                    Mantoel Sam
                </h1>
                <nav>
                    <ul className="space-y-2 mx-2">
                        <li className="px-4 py-2 bg-purple-400 hover:bg-purple-300 rounded-xl">
                            <Link
                                href="/dashboard"
                                className="flex items-center space-x-2"
                            >
                                <span className="material-icons">home</span>
                                <span className="font-semibold">
                                    Dashboard
                                </span>
                            </Link>
                        </li>

                        {(auth.user && (auth.user.role === 'pengajar' || auth.user.role === 'admin')) && (
                            <li>
                                <Link
                                    href="/siswa"
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                                >
                                    <span className="material-icons">person</span>
                                    <span className="font-semibold">
                                        Siswa
                                    </span>
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link
                                href="/contact"
                                className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                            >
                                <span className="material-icons">
                                    contact_mail
                                </span>
                                <span className="font-semibold">
                                    Contact
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-44 p-4 bg-purple-400 rounded-xl">
                        <h2 className="font-semibold mb-2">About</h2>
                        <p className="text-sm">
                            Mantoel Sam is Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Earum, possimus.
                        </p>
                        <Link
                            href="/profile"
                            className="text-sm font-semibold mt-2 hover:underline"
                        >
                            View Profile
                        </Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full p-4 bg-red-400 hover:bg-red-500 rounded-xl mt-2 flex items-center space-x-2 text-sm font-semibold"
                    >
                        <span className="material-icons">logout</span>
                        <span className="font-semibold">Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}