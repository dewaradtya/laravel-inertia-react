import React from "react";
import Layout from "../../Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { TextInput, FileInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

export default function CreateSiswa() {
    const { data, setData, post, errors } = useForm({
        nis: "",
        nama: "",
        kelas: "",
        alamat: "",
        tanggal_lahir: "",
        no_telp: "",
        foto: null,
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

    const handleFileChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };

    return (
        <Layout>
            <Head title="Tambah Siswa" />
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
                        id="kelas"
                        label="Kelas"
                        name="kelas"
                        value={data.kelas}
                        onChange={handleChange}
                        error={errors.kelas}
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
