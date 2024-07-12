import React from "react";
import Layout from "../../Layouts/Layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { TextInput } from '../../Components/Input/InputForm';

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
                    <TextInput
                        id="nis"
                        label="NIS"
                        name="nis"
                        value={data.nis}
                        onChange={handleChange}
                        error={errors.nis}
                    />
                    <TextInput
                        id="nama"
                        label="Nama"
                        name="nama"
                        value={data.nama}
                        onChange={handleChange}
                        error={errors.nama}
                    />
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
