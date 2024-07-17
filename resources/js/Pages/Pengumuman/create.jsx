import React from "react";
import Layout from "../../Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { TextInput, FileInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

export default function CreateSiswa() {
    const { data, setData, post, errors } = useForm({
        judul: "",
        isi: "",
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/pengumuman", {
            onSuccess: () => {
                console.log("Data berhasil disimpan!");
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };

    return (
        <Layout>
            <Head title="Tambah Guru" />
            <div className="container mx-auto border w-full bg-gray-300 rounded-3xl p-4">
                <h1 className="font-bold text-3xl mb-4">Tambah Data</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <TextInput
                        id="judul"
                        label="Judul"
                        name="judul"
                        value={data.judul}
                        onChange={handleChange}
                        error={errors.judul}
                    />
                    <TextInput
                        id="isi"
                        label="Isi"
                        name="isi"
                        value={data.isi}
                        onChange={handleChange}
                        error={errors.isi}
                    />
                    <FileInput
                        id="foto"
                        label="Foto"
                        name="foto"
                        onChange={handleFileChange}
                        error={errors.foto}
                    />
                    <FormButtons
                        saveLabel="Simpan"
                        cancelLabel="Cancel"
                        saveAction={handleSubmit}
                        cancelLink="/pengumuman"
                    />
                </form>
            </div>
        </Layout>
    );
}
