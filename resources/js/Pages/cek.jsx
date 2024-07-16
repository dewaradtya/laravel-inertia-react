import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Layout from '../Layouts/Layout';

export default function Cek({ cities, ongkir }) {
    const { data, setData, post, reset } = useForm({
        origin: '',
        destination: '',
        weight: '',
        courier: '',
    });

    const [ongkirResult, setOngkirResult] = useState(null); 

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/cek', {
            origin: data.origin,
            destination: data.destination,
            weight: data.weight,
            courier: data.courier,
            onSuccess: (response) => {
                console.log('Data ongkir:', response);
                setOngkirResult(response.ongkir); 
                reset(); 
            },
        });
    };

    return (
        <Layout>
            <div className='container mx-auto p-4'>
                <h1 className='font-bold text-3xl text-center'>Cek Ongkir</h1>
                <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8'>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='origin'
                        >
                            Asal Kota
                        </label>
                        <select
                            id='origin'
                            name='origin'
                            value={data.origin}
                            onChange={(e) => setData('origin', e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        >
                            <option value=''>Select origin</option>
                            {cities.map((city) => (
                                <option key={city.city_id} value={city.city_id}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='destination'
                        >
                            Kota Tujuan
                        </label>
                        <select
                            id='destination'
                            name='destination'
                            value={data.destination}
                            onChange={(e) => setData('destination', e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        >
                            <option value=''>Select destination</option>
                            {cities.map((city) => (
                                <option key={city.city_id} value={city.city_id}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='weight'
                        >
                            Weight (grams)
                        </label>
                        <input
                            type='number'
                            id='weight'
                            name='weight'
                            value={data.weight}
                            onChange={(e) => setData('weight', e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='courier'
                        >
                            Courier
                        </label>
                        <select
                            id='courier'
                            name='courier'
                            value={data.courier}
                            onChange={(e) => setData('courier', e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        >
                            <option value=''>Select Courier</option>
                            <option value='jne'>JNE</option>
                            <option value='pos'>POS Indonesia</option>
                            <option value='tiki'>TIKI</option>
                        </select>
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Cek Ongkir
                        </button>
                    </div>
                </form>

                {Array.isArray(ongkir) && ongkir.map((courier, index) => (
                    <div key={index} className="mt-8 border border-gray-300 p-4 rounded">
                        <h2 className="text-xl font-bold mb-2">Courier: {courier.name}</h2>
                        {courier.costs.map((service, idx) => (
                            <div key={idx} className="mt-4">
                                <p><strong>Service:</strong> {service.service}</p>
                                <p><strong>Description:</strong> {service.description}</p>
                                <p><strong>Cost:</strong> {service.cost[0].value}</p>
                                <p><strong>Estimated Time:</strong> {service.cost[0].etd}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Layout>
    );
}
