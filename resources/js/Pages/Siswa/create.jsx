import React from "react";
import Layout from "../../Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { TextInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

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
                    <FormButtons
                        saveLabel="Simpan"
                        cancelLabel="Cancel"
                        saveAction={handleSubmit}
                        cancelLink="/siswa"
                    />
                </form>
            </div>
        </Layout>
    );
}
