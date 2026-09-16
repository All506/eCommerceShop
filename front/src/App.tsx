import { useEffect, useState } from 'react'
import ShoeCard from './components/ShoeCard/ShoeCard'
import Navbar from './components/Navbar/Navbar';
import ShoeDetail from './components/ShoeDetail/ShoeDetail';
import styles from './App.module.css'
import noResultsGif from './assets/searching.gif';
import { useTranslation } from 'react-i18next';
import {
  getAllShoes,
  getShoeByName
} from './services/shoeService'

interface Shoe {
  id: number;
  brand: string;
  model: string;
  price: number;
  img: string;
  sale?: number;
}

interface CartItem {
  shoeId: number;
  brand: string;
  model: string;
  sizeId: number;
  size: number;
  price: number;
  quantity: number;
  img: string;
}

/*interface User {
  id: number;
  name: string;
  email: string;
}*/



function App() {
  const [catalog, setCatalog] = useState<Shoe[]>([]);
  const [search, setSearch] = useState('');
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  //const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation();

  // Ran when loaded
  useEffect(() => {
    const loadMainCatalog = async () => {
      const data = await getAllShoes();
      setCatalog(data);
    }

    loadMainCatalog();
  }, []);

  // Search and shows results
  useEffect(() => {
    const loadShoes = async () => {
      try {
        const data = await getShoeByName(search);
        setCatalog(data);
      } catch (error) {
        console.error('Error buscando zapatos:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      loadShoes();
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  // Conteo del carrito
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Add object to cart logic
  const addToCartState = (item: CartItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) =>
          cartItem.shoeId === item.shoeId &&
          cartItem.sizeId === item.sizeId
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.shoeId === item.shoeId &&
            cartItem.sizeId === item.sizeId
            ? {
              ...cartItem,
              quantity: cartItem.quantity + 1
            }
            : cartItem
        );
      }

      return [...currentCart, item];
    });
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        onCatalogClick={() => {
          setSelectedShoe(null);
          setSearch('');
        }}
        cartCount={cartCount}
      />

      {selectedShoe ? (
        <ShoeDetail
          key={selectedShoe.id}
          shoe={selectedShoe}
          onCartUpdated={addToCartState}
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
          <h2>{t('search.notFound')}</h2>
          <span>{t('search.tryAgain')}</span>
        </div>
      )}

    </>
  );
}

export default App
