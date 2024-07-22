import { Link } from "@inertiajs/react";
import React from "react";

const CardView = ({ pengumuman }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pengumuman.data.map((item) => (
                <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col"
                >
                    <img
                        src={`http://localhost:8000/storage/${item.foto}`}
                        alt={item.judul}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">{item.judul}</h2>
                    <p className="text-gray-700 mb-4 flex-grow">
                        {item.isi.length > 100 ? item.isi.substring(0, 100) + '...' : item.isi}
                    </p>
                    <Link
                        href={`/pengumuman/${item.id}`}
                        className="text-blue-600 hover:underline mt-auto"
                    >
                        View More
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CardView;
