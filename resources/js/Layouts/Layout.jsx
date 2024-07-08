import React from 'react';
import Header from '../Components/Sidebar/header';
import Sidebar from '../Components/Sidebar/index';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
