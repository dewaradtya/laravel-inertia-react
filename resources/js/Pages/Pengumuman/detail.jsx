import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';

const Detail = ({ pengumuman }) => {
    const { flash } = usePage().props;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`Check out this announcement: ${pengumuman.judul}`);

    return (
        <Layout>
            <div className="container mx-auto max-w-3xl">
                <div className="bg-gray-300 rounded-3xl p-6">
                    <img
                        src={`http://localhost:8000/storage/${pengumuman.foto}`}
                        alt={pengumuman.judul}
                        className="w-full h-72 object-cover rounded-md mb-6"
                    />
                    <h1 className="text-2xl font-bold mb-2">{pengumuman.judul}</h1>
                    <p className="text-gray-600 mb-4 text-sm">
                        {new Date(pengumuman.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                        {pengumuman.isi}
                    </p>
                    
                    <div className="mt-6 flex items-center space-x-2">
                        <button
                            onClick={handleCopyLink}
                            className="material-icons bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
                        >
                            link
                        </button>
                        
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="material-icons bg-blue-800 text-white p-2 rounded-full shadow-md hover:bg-blue-900"
                        >
                            facebook
                        </a>
                        
                        <a
                            href={`https://twitter.com/intent/tweet?text=${shareText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500"
                        >
                            Share on Twitter
                        </a>
                        
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${pengumuman.judul}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800"
                        >
                            Share on LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Detail;
