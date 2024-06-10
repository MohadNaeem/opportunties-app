// pages/index.js
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('opportunities').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Opportunities</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>NAICS Code: {item.naics_code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
