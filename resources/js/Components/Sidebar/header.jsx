import React from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
  return (
    <header className="bg-purple-600 text-white p-4 border-b rounded-3xl border-gray-300  shadow-md m-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
          <Link href="/" className="text-lg font-semibold hover:text-purple-200 transition duration-200">Home</Link>
          <Link href="/siswa" className="text-lg font-semibold hover:text-purple-200 transition duration-200">Siswa</Link>
          <Link href="/contact" className="text-lg font-semibold hover:text-purple-200 transition duration-200">Contact</Link>
        </div>
      </div>
    </header>
  );
}