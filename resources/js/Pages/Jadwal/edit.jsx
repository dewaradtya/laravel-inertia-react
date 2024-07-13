import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import { TextInput, DropdownInput } from "../../Components/Input/InputForm";
import FormButtons from "../../Components/Button";

const Edit = ({ jadwal, showModal, setShowModal, guru }) => {
    const { data, setData, put, errors } = useForm({
        kelas: jadwal.kelas,
        mapel: jadwal.mapel,
        guru_id: jadwal.guru_id,
        hari: jadwal.hari,
        jam_mulai: jadwal.jam_mulai,
        jam_selesai: jadwal.jam_selesai,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/jadwal/${jadwal.id}`, data, {
            onSuccess: () => {
                console.log("Data berhasil diperbarui!");
                setShowModal(false);
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <Modal
            title="Edit jadwal"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        options={guru && guru.map((g) => ({
                            value: g.id,
                            label: g.nama,
                        }))}
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
                        cancelLabel="Batal"
                        saveAction={handleSubmit}
                        cancelAction={() => setShowModal(false)}
                    />
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Edit;