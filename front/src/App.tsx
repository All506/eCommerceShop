import { useEffect, useState } from 'react'
import ShoeCard from './components/ShoeCard/ShoeCard'
import styles from './App.module.css'

function App() {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const loadMainCatalog = async () => {
      const response = await fetch('/api/shoes');
      const data = await response.json();
      setCatalog(data);
      console.log(data)
    }

    loadMainCatalog();
  }, []);

  return (
  <div className={styles.catalog}>
    {catalog.map((shoe) => (
      <ShoeCard
        key={shoe.id}
        shoe={shoe}
      />
    ))}
  </div>
);
}

export default App
