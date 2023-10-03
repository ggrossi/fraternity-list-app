// pages/index.js

import Link from 'next/link';

export default function Home({ fraternities }) {
  return (
    <div className="container mx-auto p-4">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-xl font-semibold">Fraternity Finder</h1>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center mt-6 mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold">Repúblicas de Ouro Preto</h1>
      </header>

      {/* Fraternity Listing */}
      <ul>
        {fraternities.map((fraternity) => (
          <li key={fraternity.id} className="mb-2">
            <Link href={`/fraternity/${encodeURIComponent(fraternity.name)}`} passHref>
              <span className="text-blue-500 hover:underline cursor-pointer">{fraternity.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fraternities`);
  const fraternities = await res.json();

  return {
    props: {
      fraternities,
    },
  };
}
