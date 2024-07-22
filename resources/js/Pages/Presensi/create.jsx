import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { DropdownInput } from '../../Components/Input/InputForm';
import FormButtons from '../../Components/Button';

export default function CreateJadwal({ siswa }) {
    const { data, setData, post, errors } = useForm({
        siswa_id: "",
        keterangan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/presensi", {
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
            <Head title="Presensi" />
            <div className="container mx-auto border w-full bg-gray-300 rounded-3xl p-4">
                <h1 className="font-bold text-2xl mb-4">Presensi</h1>
                <form onSubmit={handleSubmit}>
                    <DropdownInput
                        id="siswa_id"
                        label="Nama Siswa"
                        name="siswa_id"
                        value={data.siswa_id}
                        onChange={handleChange}
                        error={errors.siswa_id}
                        options={siswa.map(g => ({ value: g.id, label: g.nama }))}
                        placeholder="Pilih Siswa"
                    />
                    <DropdownInput
                        id="keterangan"
                        label="Keterangan"
                        name="keterangan"
                        value={data.keterangan}
                        onChange={handleChange}
                        error={errors.keterangan}
                        options={[
                            { value: "Hadir", label: "Hadir" },
                            { value: "Sakit", label: "Sakit" },
                            { value: "Izin", label: "Izin" },
                            { value: "Absen", label: "Absen" }
                        ]}
                        placeholder="Pilih Keterangan"
                    />
                    <FormButtons
                        saveLabel="Simpan"
                        cancelLabel="Cancel"
                        saveAction={handleSubmit}
                        cancelLink="/presensi"
                    />
                </form>
            </div>
        </Layout>
    );
}