import { useEffect, useState } from 'react'
import ShoeCard from './components/ShoeCard/ShoeCard'
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css'

function App() {
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState([]);

  // Ran when loaded
  useEffect(() => {
    const loadMainCatalog = async () => {
      const response = await fetch('/api/shoes');
      const data = await response.json();
      setCatalog(data);
      console.log(data)
    }

    loadMainCatalog();
  }, []);

  // Search and shows results
   useEffect(() => {
    const loadShoes = async () => {
      const response = await fetch(
        `/api/shoes?search=${encodeURIComponent(search)}`
      );

      const data = await response.json();
      setCatalog(data);
    };

    const timeoutId = setTimeout(() => {
      loadShoes();
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className={styles.catalog}>
        {catalog.map((shoe) => (
          <ShoeCard
            key={shoe.id}
            shoe={shoe}
          />
        ))}
      </div>
    </>
  );
}

export default App
