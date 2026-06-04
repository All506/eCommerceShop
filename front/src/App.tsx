import { useEffect, useState } from 'react'
import ShoeCard from './components/ShoeCard/ShoeCard'
import Navbar from './components/Navbar/Navbar';
import ShoeDetail from './components/ShoeDetail/ShoeDetail';
import styles from './App.module.css'
import noResultsGif from './assets/searching.gif';

function App() {
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectedShoe, setSelectedShoe] = useState(null);

  // Ran when loaded
  useEffect(() => {
    const loadMainCatalog = async () => {
      const response = await fetch('/api/shoes');
      const data = await response.json();
      setCatalog(data);
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

      {selectedShoe ? (
        <ShoeDetail
        key={selectedShoe.id}
        shoe={selectedShoe}
        />
      ) : catalog.length > 0 ? (
        <div className={styles.catalog}>
          {catalog.map((shoe) => (
            <ShoeCard
              key={shoe.id}
              shoe={shoe}
              onClick={() => {
                setSelectedShoe(shoe)
                setSearch('')
              }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noResult}>
          <img src={noResultsGif} alt="No results" />
          <h2>No encontramos resultados</h2>
          <span>Por favor intenta con otro producto</span>
        </div>
      )}

    </>
  );
}

export default App
