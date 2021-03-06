import Link from 'next/link'
import styles from "../styles/productcard.module.scss"


const ProductCard = ({product}) => {
    return (
        <div className = {styles.card}>
            {product.hot && <span className = {styles.hot}>🔥 Seller</span>}
            <img src={product.heroImage} alt="product" />
            <div className = { styles.product__info}>
                <span className = {styles.brand}>{product.brand}</span>
                <span className = {styles.name}>{product.name}</span>
                <span className = {styles.price}> $ {product.price}</span>
                <Link href = {`/products/${product._id}`}><button className = {styles.product__link}>Go To Product</button></Link>
            </div>
        </div>
    )
}

export default ProductCard
