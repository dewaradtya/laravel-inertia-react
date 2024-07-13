import React, { useState } from 'react';

export function TextInput({ id, label, name, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`mt-1 block w-full px-3 py-2 border ${
                    error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-600'
                } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

export function FileInput({ id, label, name, onChange, error }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type="file"
                name={name}
                accept="image/*"
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

export function PasswordInput({ id, label, name, value, onChange, error, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`mt-1 block w-full px-3 py-2 border ${
                        error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-600'
                    } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm pr-10`}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19.071 4.929a2 2 0 010 2.828L5.757 19.071a2 2 0 01-2.828-2.828L16.243 2.1a2 2 0 012.828 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 9a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 8V4a2 2 0 00-2-2H8a2 2 0 00-2 2v4m12 8v-4a2 2 0 00-2-2H8a2 2 0 00-2 2v4m4 0h4m-4 0a2 2 0 01-2-2V8m4 12a2 2 0 01-2 2H8a2 2 0 01-2-2v-4"
                            />
                        </svg>
                    )}
                </button>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}


export function DropdownInput({ id, label, name, value, onChange, error, options = [], placeholder }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full py-2 px-3 border ${
                    error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-purple-600'
                } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 sm:text-sm`}
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}