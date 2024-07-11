import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "../../Components/Modal";

const ImportExcel = ({ showModal, setShowModal }) => {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } =
        useForm({
            file: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/siswa-import", {
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

    return (
        <Modal
            title="Import Excel"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            id="file"
                            onChange={(e) => setData("file", e.target.files[0])}
                        />
                        {errors.file && (
                            <div className="invalid-feedback text-red-500">
                                {errors.file}
                            </div>
                        )}
                    </div>
                    <Modal.Footer>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            onClick={() => setShowModal(false)}
                            disabled={processing}
                        >
                            Tutup
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mr-2"
                            disabled={processing}
                        >
                            {processing ? "Memproses..." : "Import"}
                        </button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ImportExcel;