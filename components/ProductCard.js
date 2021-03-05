import Link from 'next/link'
import styles from "../styles/productcard.module.scss"


const ProductCard = ({product}) => {
    return (
        <div className = {styles.card}>
            <img src={product.heroImage} alt="product" />
            <div className = { styles.product__info}>
                <span className = {styles.brand}>{product.brand}</span>
                <span className = {styles.name}>{product.name}</span>
                <span className = {styles.price}> $ {product.price}</span>
                <Link href = {`/products/${product._id}`}><button className = {styles.product__link}>See Product</button></Link>
            </div>
        </div>
    )
}

export default ProductCard
