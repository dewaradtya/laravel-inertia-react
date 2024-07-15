import React from "react";
import { Link, usePage, router } from "@inertiajs/react";

export default function Sidebar() {
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(
            "/logout",
            {},
            {
                onSuccess: () => {
                    console.log("Successfully logged out!");
                },
            }
        );
    };

    return (
        <aside className="h-screen w-64 bg-purple-600 text-white border-r rounded-3xl border-blue-200 shadow-lg m-4">
            <div className="pt-8">
                <h1 className="text-2xl italic font-bold text-center mb-8">
                    School Sam
                </h1>
                <nav>
                    <ul className="space-y-2 mx-2">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center space-x-2 px-4 py-2 bg-purple-400 hover:bg-purple-300 rounded-xl"
                            >
                                <span className="material-icons">home</span>
                                <span className="font-semibold">Dashboard</span>
                            </Link>
                        </li>

                        {auth.user && auth.user.role === "admin" && (
                            <li>
                                <p className="ml-5">Manajemen</p>

                                <Link
                                    href="/siswa"
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                                >
                                    <span className="material-icons">
                                        person
                                    </span>
                                    <span className="font-semibold">
                                        Manajemen Siswa
                                    </span>
                                </Link>
                            </li>
                        )}

                        {auth.user && auth.user.role === "admin" && (
                            <li>
                                <Link
                                    href="/guru"
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                                >
                                    <span className="material-icons">
                                        person
                                    </span>
                                    <span className="font-semibold">
                                        Manajemen Guru
                                    </span>
                                </Link>
                            </li>
                        )}

                        <li>
                        <p className="ml-5">Schedule</p>
                            <Link
                                href="/jadwal"
                                className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                            >
                                <span className="material-icons">schedule</span>
                                <span className="font-semibold">
                                    Jadwal Pelajaran
                                </span>
                            </Link>
                        </li>
                        <li>

                        <p className="ml-5">Presensi</p>
                            <Link
                                href="/presensi"
                                className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                            >
                                <span className="material-icons">note</span>
                                <span className="font-semibold">
                                    Presensi Siswa
                                </span>
                            </Link>
                        </li>

                        {auth.user && auth.user.role === "admin" && (
                            <li>
                                <p className="ml-5">Setting</p>
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                                >
                                    <span className="material-icons">
                                        storage
                                    </span>
                                    <span className="font-semibold">
                                        Profile User
                                    </span>
                                </Link>
                            </li>
                        )}
                    <button
                        onClick={handleLogout}
                        className="w-full p-4 bg-red-400 hover:bg-red-500 rounded-xl flex items-center space-x-2 text-sm font-semibold"
                    >
                        <span className="material-icons">logout</span>
                        <span className="font-semibold">Logout</span>
                    </button>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
