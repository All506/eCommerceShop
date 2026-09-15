import { useEffect, useState } from 'react';
import styles from './ShoeDetail.module.css'

interface Shoe {
    id: number;
    brand: string;
    model: string;
    price: number;
    img: string;
    sale?: number;
}

interface ShoeDetailProps {
    shoe: Shoe;
}

interface ShoeImage {
    id: number;
    link: string;
}

function ShoeDetail({ shoe }: ShoeDetailProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<ShoeImage[]>([]);
    const [isFading, setIsFading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`${import.meta.env.BASE_URL}api/shoes/images?id=${shoe.id}`)
            .then(response => response.json())
            .then(data => {
                setImages(data)
            })
            .catch(() => {
                console.log(`Error al obtener imagenes de shoe id ${shoe.id}`);

                setImages([
                    {
                        id: shoe.id,
                        link: shoe.img
                    }
                ]);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [shoe])

    // Cambios de estado relacionados a carusel

    const nextImage = () => {
        setIsFading(true);

        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );

            setIsFading(false);
        }, 200);
    };

    const previousImage = () => {
        setIsFading(true);

        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );

            setIsFading(false);
        }, 200);
    };

    const handleImageError = (index: number) => {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );

        setCurrentIndex(0);
    };

    // Logica del plugin 

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    } else {
        return (
            <div className={styles.detail}>
                <h1>
                    {shoe.brand} {shoe.model}
                </h1>

                <h2>
                    €{(shoe.price * (1 - (shoe.sale ?? 0) / 100)).toFixed(0)}
                </h2>

                <div className={styles.carousel}>
                    <img
                        className={`${styles.carouselImage} ${isFading ? styles.fadeOut : styles.fadeIn
                            }`}
                        src={images[currentIndex].link}
                        alt={`${shoe.brand} ${shoe.model}`}
                        onError={() => handleImageError(currentIndex)}
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
                                onClick={previousImage}
                                aria-label="Imagen anterior"
                            >
                                ‹
                            </button>

                            <button
                                className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
                                onClick={nextImage}
                                aria-label="Imagen siguiente"
                            >
                                ›
                            </button>
                        </>
                    )}

                    <div className={styles.carouselCounter}>
                        {currentIndex + 1} / {images.length}
                    </div>

                    <div className={styles.thumbnails}>
                        {images.map((image, index) => (
                            <button
                                key={`${image.id}-${index}`}
                                className={`${styles.thumbnail} ${currentIndex === index ? styles.thumbnailActive : ''
                                    }`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img
                                    src={image.link}
                                    alt={`${shoe.model} vista ${index + 1}`}
                                />
                            </button>
                        ))}
                    </div>

                </div>

            </div>
        )
    }

}

export default ShoeDetail;