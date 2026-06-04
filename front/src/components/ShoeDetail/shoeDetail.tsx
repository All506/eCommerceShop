import styles from './ShoeDetail.module.css'

interface Shoe {
    id: number;
    brand: string;
    model: string;
    price: number;
    img: string
}

function ShoeDetail({ shoe }: Shoe) {
    return (
        
        <div className={styles.detail}>
            <h1>{shoe.brand} {shoe.model}</h1>
        </div>
            
    )
}

export default ShoeDetail;