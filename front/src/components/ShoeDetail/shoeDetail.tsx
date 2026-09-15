import { useEffect, useState } from 'react';
import styles from './ShoeDetail.module.css'

interface Shoe {
    id: number;
    brand: string;
    model: string;
    price: number;
    img: string
}

function ShoeDetail({ shoe }: Shoe) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(`/api/shoes/images?id=${shoe.id}`)
        .then(response => response.json())
        .then(data => {
            setImages(data)
        })
        .catch(error => {
            console.log(`Error al obtener imagenes de shoe id ${shoe.id}`);
            setImages([shoe.img]);
        })
    },[shoe])

    return (
        <div className={styles.detail}>
            <h1>{shoe.brand} {shoe.model}</h1>
            {images.map((image) => (
        <img
          key={image.link}
          src={image.link}
          alt="Shoe"
        />
      ))}
            <h2>€{(shoe.price * (1 - (shoe.sale ?? 0) / 100)).toFixed(0)}</h2>
        </div>
            
    )
}

export default ShoeDetail;