import React from 'react';
import { Link } from '@inertiajs/react';

const FormButtons = ({ saveLabel, cancelLabel, saveAction, cancelLink }) => {
    return (
        <div>
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mx-2"
                onClick={saveAction}
            >
                {saveLabel}
            </button>
            <Link
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                href={cancelLink}
            >
                {cancelLabel}
            </Link>
        </div>
    );
};

export default FormButtons;
