import React from "react";
import { useForm } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import { TextInput, DropdownInput } from "../../Components/Input/InputForm";
import FormButtons from "../../Components/Button";

const Edit = ({ presensi, showModal, setShowModal, siswa }) => {
    const { data, setData, put, errors } = useForm({
        siswa_id: presensi.siswa_id,
        keterangan: presensi.keterangan,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/presensi/${presensi.id}`, data, {
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
            title="Edit presensi"
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
                        options={siswa && siswa.map((g) => ({
                            value: g.id,
                            label: g.nama,
                        }))}
                        placeholder="Pilih Siswa"
                    />
                    <TextInput
                        id="keterangan"
                        label="Keterangan"
                        name="keterangan"
                        value={data.keterangan}
                        onChange={handleChange}
                        error={errors.keterangan}
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