import React from "react";
import Layout from "../../Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { TextInput, FileInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

export default function CreateSiswa() {
    const { data, setData, post, errors } = useForm({
        nama: "",
        mapel: "",
        tanggal_lahir: "",
        alamat: "",
        no_telp: "",
        email: "",
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/guru", {
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
                        id="nama"
                        label="Nama"
                        name="nama"
                        value={data.nama}
                        onChange={handleChange}
                        error={errors.nama}
                    />
                    <TextInput
                        id="mapel"
                        label="Mapel"
                        name="mapel"
                        value={data.mapel}
                        onChange={handleChange}
                        error={errors.mapel}
                    />
                    <TextInput
                        id="alamat"
                        label="Alamat"
                        name="alamat"
                        value={data.alamat}
                        onChange={handleChange}
                        error={errors.alamat}
                    />
                    <TextInput
                        id="tanggal_lahir"
                        label="Tanggal Lahir"
                        name="tanggal_lahir"
                        type="date"
                        value={data.tanggal_lahir}
                        onChange={handleChange}
                        error={errors.tanggal_lahir}
                    />
                    <TextInput
                        id="no_telp"
                        label="No Telepon"
                        name="no_telp"
                        value={data.no_telp}
                        onChange={handleChange}
                        error={errors.no_telp}
                    />
                    <TextInput
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
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
                        cancelLink="/siswa"
                    />
                </form>
            </div>
        </Layout>
    );
}
