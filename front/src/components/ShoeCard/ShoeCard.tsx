import styles from './ShoeCards.module.css'

interface Shoe {
    id: number;
    brand: string;
    model: string;
    price: number;
    img: string;
    onClick: () => void;
}

function ShoeCard({ shoe, onClick }: Shoe) {
    return (
        <div className={styles.cardBackground} onClick={onClick}>
            <img src={shoe.img}></img>
            <span className={styles.model}>{shoe.brand} {shoe.model}</span>

            {shoe.sale ? (
                <span className={styles.sale}>
                    <span className={styles.price}>
                        €{shoe.price}
                    </span> 
                    <br></br>
                    €{(shoe.price * (1 - shoe.sale / 100)).toFixed(0)} 
                    <br></br>
                    <span>{shoe.sale}% off</span> 
                </span>
            ) : (
                <span className={styles.price}>
                    €{shoe.price}
                </span>
            )}
        </div>
    )
}

export default ShoeCard;