import { useEffect, useState } from 'react';
import styles from './ShoeDetail.module.css'
import { useTranslation } from 'react-i18next';
import {
    getShoeImages,
    getShoeSizes
} from '../../services/shoeService';
import {
    addCartItem
} from '../../services/cartService';

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

interface ShoeDetailProps {
    shoe: Shoe;
    onCartUpdated: (item: CartItem) => void;
}

interface ShoeImage {
    id: number;
    link: string;
}

interface ShoeSize {
    id: number;
    sizeId: number;
    size: number;
    stock: number;
}

function ShoeDetail({ shoe, onCartUpdated }: ShoeDetailProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<ShoeImage[]>([]);
    const [isFading, setIsFading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sizes, setSizes] = useState<ShoeSize[]>([]);
    const [selectedSize, setSelectedSize] = useState<ShoeSize | null>(null);
    const [actualStock, setActualStock] = useState<number | null>(null);
    const [sizeError, setSizeError] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true);

        const loadShoeDetail = async () => {
            try {
                const imagesData = await getShoeImages(shoe.id);
                const sizesData = await getShoeSizes(shoe.id);

                setImages(imagesData);
                setSizes(sizesData);

            } catch (error) {
                console.error('Error cargando detalle:', error);
            } finally {
                setLoading(false);
            }
        };

        loadShoeDetail();
    }, [shoe])

    // Cambio de talla para mostrar stock
    const handleSizeChange = (shoeSize: ShoeSize) => {
        setSelectedSize(shoeSize);
        setActualStock(shoeSize.stock);
        setSizeError(false);
    }

    // Add to cart function
    const handleAddToCart = async (shoe: Shoe, shoeSize: ShoeSize | null) => {
        if (shoeSize === null) {
            setSizeError(true);
            return;
        } else {
            setSizeError(false);

            try {
                const cartItem = await addCartItem({
                    cartId: 1,
                    shoeId: shoe.id,
                    sizeId: shoeSize.sizeId,
                    quantity: 1
                });

                onCartUpdated({
                    shoeId: shoe.id,
                    brand: shoe.brand,
                    model: shoe.model,
                    sizeId: shoeSize.sizeId,
                    size: shoeSize.size,
                    price: shoe.price,
                    quantity: 1,
                    img: shoe.img
                });

                console.log('Producto agregado:', cartItem);

            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

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
                <p>{t('shoeDetail.instructions1')}</p>
                <div className={styles.sizesContainer}>
                    <div className={styles.sizes}>
                        {sizes.map((shoeSize) => (
                            <label
                                key={shoeSize.id}
                                className={`${styles.sizeOption} ${selectedSize?.size === shoeSize.size
                                    ? styles.sizeSelected
                                    : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="shoeSize"
                                    value={shoeSize.size}
                                    checked={selectedSize?.size === shoeSize.size}
                                    onChange={() => handleSizeChange(shoeSize)}
                                />

                                <span>{shoeSize.size}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {
                    actualStock && (
                        <p>{t('shoeDetail.stock')}: {actualStock}</p>
                    )
                }
                <div className={styles.generalSpace}>
                    <button
                        className={styles.addButton}
                        onClick={() => handleAddToCart(shoe, selectedSize)}>{t('general.addToCart')}</button>

                </div>

                {sizeError && (
                    <p className={styles.errorMessage}>
                        {t('error.selectShoeSize')}
                    </p>
                )}

            </div>
        )
    }

}

export default ShoeDetail;