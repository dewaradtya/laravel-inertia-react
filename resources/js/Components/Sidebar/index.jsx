import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";

export default function Sidebar() {
    const { auth } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const menuItems = [
        {
            href: "/siswa",
            icon: "person",
            label: "Manajemen Siswa",
            adminOnly: true
        },
        {
            href: "/guru",
            icon: "person",
            label: "Manajemen Guru",
            adminOnly: true
        },
        {
            href: "/jadwal",
            icon: "schedule",
            label: "Jadwal Pelajaran",
            adminOnly: false
        },
        {
            href: "/presensi",
            icon: "note",
            label: "Presensi Siswa",
            adminOnly: false
        },
        {
            href: "/nilai",
            icon: "grade",
            label: "Nilai Siswa",
            adminOnly: false
        },
        {
            href: "/pengumuman",
            icon: "announcement",
            label: "Pengumuman Sekolah",
            adminOnly: false
        },
        {
            href: "/profile",
            icon: "storage",
            label: "Profile User",
            adminOnly: true
        }
    ];

    const renderMenuItems = () =>
        menuItems.map((item, index) => {
            if (item.adminOnly && (!auth.user || auth.user.role !== "admin")) {
                return null;
            }
            return (
                <li key={index}>
                    <Link
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-200"
                    >
                        <span className="material-icons">{item.icon}</span>
                        <span className="font-semibold">{item.label}</span>
                    </Link>
                </li>
            );
        });

    return (
        <>
            {/* Sidebar for large screens */}
            <aside className="hidden lg:block h-screen w-64 bg-purple-600 text-white border-r rounded-3xl border-blue-200 shadow-lg m-4">
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
                            {renderMenuItems()}
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

            {/* Bottom bar for small screens */}
            <nav className="fixed bottom-0 m-2 rounded-full inset-x-0 bg-purple-600 text-white border-t border-purple-200 shadow-lg lg:hidden z-50 flex justify-between items-center p-4">
                <span className="text-xl font-bold">School Sam</span>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="material-icons bg-white p-2 rounded-full shadow-lg text-purple-600 focus:outline-none"
                >menu
                </button>
            </nav>

            {/* Modal for mobile menu */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-3/4 shadow-lg relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <span className="material-icons">close</span>
                        </button>
                        <h1 className="text-2xl italic font-bold text-center mb-8">
                            School Sam
                        </h1>
                        <nav>
                            <ul className="space-y-2 mx-2">
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center space-x-2 px-4 py-2 bg-purple-400 hover:bg-purple-300 rounded-xl"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        <span className="material-icons">home</span>
                                        <span className="font-semibold">Dashboard</span>
                                    </Link>
                                </li>
                                {renderMenuItems().map((item) => (
                                    <li key={item.key} onClick={() => setIsModalOpen(false)}>
                                        {item}
                                    </li>
                                ))}
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
                </div>
            )}
        </>
    );
}
