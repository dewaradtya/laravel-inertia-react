import React, { useState, useEffect } from "react";
import Layout from "../../Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { TextInput, FileInput, DropdownInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

export default function CreateJadwal({ guru }) {
    const { data, setData, post, errors } = useForm({
        kelas: "",
        mapel: "",
        guru_id: "",
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/jadwal", {
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
            <Head title="Tambah Jadwal" />
            <div className="container mx-auto border w-full bg-gray-300 rounded-3xl p-4">
                <h1 className="font-bold text-2xl mb-4">Tambah Jadwal Pelajaran</h1>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        id="kelas"
                        label="Kelas"
                        name="kelas"
                        value={data.kelas}
                        onChange={handleChange}
                        error={errors.kelas}
                    />
                    <TextInput
                        id="mapel"
                        label="Mapel"
                        name="mapel"
                        value={data.mapel}
                        onChange={handleChange}
                        error={errors.mapel}
                    />
                    <DropdownInput
                        id="guru_id"
                        label="Guru"
                        name="guru_id"
                        value={data.guru_id}
                        onChange={handleChange}
                        error={errors.guru_id}
                        options={guru.map(g => ({ value: g.id, label: g.nama }))}
                        placeholder="Pilih Guru"
                    />
                    <TextInput
                        id="hari"
                        label="Hari"
                        name="hari"
                        value={data.hari}
                        onChange={handleChange}
                        error={errors.hari}
                    />
                    <TextInput
                        id="jam_mulai"
                        label="Jam Mulai"
                        name="jam_mulai"
                        type="time"
                        value={data.jam_mulai}
                        onChange={handleChange}
                        error={errors.jam_mulai}
                    />
                    <TextInput
                        id="jam_selesai"
                        label="Jam Selesai"
                        name="jam_selesai"
                        type="time"
                        value={data.jam_selesai}
                        onChange={handleChange}
                        error={errors.jam_selesai}
                    />
                    <FormButtons
                        saveLabel="Simpan"
                        cancelLabel="Cancel"
                        saveAction={handleSubmit}
                        cancelLink="/jadwal"
                    />
                </form>
            </div>
        </Layout>
    );
}