import React from "react";

const CardView = ({ pengumuman }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pengumuman.data.map((item) => (
                <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                >
                    <img
                        src={`http://localhost:8000/storage/${item.foto}`}
                        alt={item.judul}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-semibold">{item.judul}</h2>
                    <p
                        className="text-gray-700 mt-2"
                        style={{
                            maxHeight: "6em",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3, 
                            position: "relative",
                        }}
                    >
                        {item.isi}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default CardView;
