import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ meta }) {
  if (!meta || !meta.links) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      {meta.links.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          className={`px-3 py-1 border rounded-lg ${
            link.active ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
          } hover:bg-purple-500 hover:text-white transition duration-200`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}