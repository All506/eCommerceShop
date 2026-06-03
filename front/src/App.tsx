import { useEffect, useState } from 'react'
import ShoeCard from './components/ShoeCard/ShoeCard'
import './App.css'

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
    <>
      <ul>
        {catalog.map((shoe) => (
          <ShoeCard shoe={shoe}></ShoeCard>
        ))}
      </ul>
    </>
  )
}

export default App
