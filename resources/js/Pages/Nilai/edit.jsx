import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import { TextInput, DropdownInput } from "../../Components/Input/InputForm";
import FormButtons from "../../Components/Button";

const Edit = ({ nilai, showModal, setShowModal, siswa }) => {
    const { data, setData, put, errors } = useForm({
        siswa_id: nilai.siswa_id,
        mapel: nilai.mapel,
        nilai: nilai.nilai,
        tanggal: nilai.tanggal,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/nilai/${nilai.id}`, data, {
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
            title="Edit nilai"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <DropdownInput
                        id="siswa_id"
                        label="Siswa"
                        name="siswa_id"
                        value={data.siswa_id}
                        onChange={handleChange}
                        error={errors.siswa_id}
                        options={
                            siswa &&
                            siswa.map((g) => ({
                                value: g.id,
                                label: g.nama,
                            }))
                        }
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
