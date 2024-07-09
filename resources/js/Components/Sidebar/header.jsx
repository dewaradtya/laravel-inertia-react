import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Selamat Pagi');
    } else if (hours < 15) {
      setGreeting('Selamat Siang');
    } else if (hours < 18) {
      setGreeting('Selamat Sore');
    } else {
      setGreeting('Selamat Malam');
    }
  }, []);

  return (
    <header className="bg-purple-300 text-gray-700 p-4 border-b rounded-3xl border-gray-300 shadow-md m-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="text-lg font-semibold">{greeting}, Admin</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src="/img/default.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
          <Link href="/profile" className="font-semibold hover:text-gray-300 transition duration-200">Profile</Link>
        </div>
      </div>
    </header>
  );
}