// pages/fraternity/[name].js

import { useRouter } from 'next/router';

export default function FraternityDetail({ fraternity }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{fraternity.name}</h1>
      <p><strong>Year of Foundation:</strong> {fraternity.year_of_foundation}</p>
      <p><strong>Address:</strong> {fraternity.address}</p>
      <p><strong>Number of Rooms:</strong> {fraternity.number_of_rooms}</p>
      <p><strong>Phone:</strong> {fraternity.phone}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fraternities?name=${encodeURIComponent(name)}`);
  const fraternity = await res.json();

  return {
    props: {
      fraternity,
    },
  };
}
