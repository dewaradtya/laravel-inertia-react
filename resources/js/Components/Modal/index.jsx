import React from 'react';
import { useEffect, useRef } from 'react';

const Modal = ({ title, children, showModal, setShowModal }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && event.target.classList.contains('modal-overlay')) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal, setShowModal]);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${showModal ? 'block' : 'hidden'}`}>
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
            <div ref={modalRef} className="modal-container bg-white rounded-lg z-50 p-6 max-w-md w-full">
                <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowModal(false)}
                    >
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

const Body = ({ children }) => {
    return <div className="modal-body">{children}</div>;
};

const Footer = ({ children }) => {
    return <div className="modal-footer mt-4 flex justify-end space-x-2">{children}</div>;
};

Modal.Body = Body;
Modal.Footer = Footer;
export default Modal;