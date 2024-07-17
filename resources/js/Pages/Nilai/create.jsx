import React, { useState, useEffect } from "react";
import Layout from "../../Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { TextInput, FileInput, DropdownInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

export default function CreateJadwal({ siswa }) {
    const { data, setData, post, errors } = useForm({
        siswa_id: "",
        mapel: "",
        nilai: "",
        tanggal: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/nilai", {
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
            <Head title="Nilai" />
            <div className="container mx-auto border w-full bg-gray-300 rounded-3xl p-4">
                <h1 className="font-bold text-2xl mb-4">Nilai</h1>
                <form onSubmit={handleSubmit}>
                    <DropdownInput
                        id="siswa_id"
                        label="Nama Siswa"
                        name="siswa_id"
                        value={data.siswa_id}
                        onChange={handleChange}
                        error={errors.siswa_id}
                        options={siswa.map(s => ({ value: s.id, label: s.nama }))}
                        placeholder="Pilih Siswa"
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
                        id="nilai"
                        label="Nilai"
                        name="nilai"
                        type="number"
                        value={data.nilai}
                        onChange={handleChange}
                        error={errors.nilai}
                    />
                    <TextInput
                        id="tanggal"
                        label="Tanggal"
                        name="tanggal"
                        type="date"
                        value={data.tanggal}
                        onChange={handleChange}
                        error={errors.tanggal}
                    />
                    <FormButtons
                        saveLabel="Simpan"
                        cancelLabel="Cancel"
                        saveAction={handleSubmit}
                        cancelLink="/nilai"
                    />
                </form>
            </div>
        </Layout>
    );
}