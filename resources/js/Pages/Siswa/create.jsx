import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateSiswa() {
    const { data, setData, post, errors } = useForm({
        nis: "",
        nama: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/siswa", {
            onSuccess: () => {
                console.log("Data berhasil disimpan!");
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <Layout>
            <Head title="Tambah Siswa" />
            <div className="container mx-auto border w-full bg-gray-300 rounded-3xl p-4">
                <h1 className="font-bold text-3xl mb-4">
                    Tambah Data
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="nis"
                            className="block text-sm font-medium text-gray-700"
                        >
                            NIS
                        </label>
                        <input
                            id="nis"
                            type="text"
                            name="nis"
                            value={data.nis}
                            onChange={handleChange}
                            className={`mt-1 block w-1/2 px-3 py-2 border ${
                                errors.nis
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-purple-600"
                            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm`}
                        />
                        {errors.nis && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.nis}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="nama"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nama
                        </label>
                        <input
                            id="nama"
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={handleChange}
                            className={`mt-1 block w-1/2 px-3 py-2 border ${
                                errors.nama
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-purple-600"
                            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm`}
                        />
                        {errors.nama && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.nama}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mx-2"
                        >
                            Simpan
                        </button>
                        <Link
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            href="/siswa"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
