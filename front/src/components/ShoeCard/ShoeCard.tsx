import styles from './ShoeCards.module.css'

interface Shoe {
    id: number;
    brand: string;
    model: string;
    price: number;
    img: string
}

function ShoeCard({shoe}: Shoe) {
    return (
        <div className={styles.cardBackground}>
        <img src={shoe.img}></img>
        <span className={styles.model}>{shoe.brand} {shoe.model}</span>
        <span className={styles.price}>€{shoe.price}</span>
        </div>
    )
}

export default ShoeCard;