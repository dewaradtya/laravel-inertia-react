import Layout from "../../Layouts/Layout";
import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Table from "../../Components/Tabel/index";

export default function Siswa({ siswa }) {
    const { flash } = usePage().props;

    return (
        <Layout>
            <Head title="Siswa" />
            <div className="container mx-auto flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl text-black">
                    Data Siswa
                </h1>

                <Link
                    className="border bg-green-500 hover:bg-green-700 px-4 p-2 rounded-3xl text-white shadow-sm"
                    href="/siswa/create"
                >
                    Tambah Data
                </Link>
            </div>
            <Table siswa={siswa} meta={siswa.meta} />
        </Layout>
    );
}