import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import { FileInput } from "../../Components/Input/InputForm";
import FormButtons from "../../Components/Button"; 

const ImportExcel = ({ showModal, setShowModal }) => {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } =
        useForm({
            file: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/guru-import", {
            preserveScroll: true,
            forceFormData: true,
            onError: (error) => {
                console.log("Import error:", error);
            },
            onFinish: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            setShowModal(false);
        }
    }, [recentlySuccessful, setShowModal]);

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]);
    };

    return (
        <Modal
            title="Import Excel"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <FileInput
                        id="file"
                        label="Select Excel File"
                        onChange={handleFileChange}
                        error={errors.file}
                    />
                    <Modal.Footer>
                        <FormButtons
                            saveLabel={processing ? "Memproses..." : "Import"}
                            cancelLabel="Tutup"
                            saveAction={handleSubmit}
                            cancelAction={() => setShowModal(false)}
                            saveDisabled={processing}
                            cancelDisabled={processing}
                        />
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ImportExcel;