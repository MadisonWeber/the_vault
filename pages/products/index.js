import Layout from "../../components/Layout"
import { getProducts } from "../../swr/productsHook"
import styles from '../../styles/products.module.scss'
import LoaderOne from "../../components/LoaderOne"
import ProductCard from '../../components/ProductCard'

const products = () => {


    const { data, loading, error } = getProducts() 


    if(loading) return (
        <Layout description = "the vault products page">
            <div className = {styles.center__loader}>
                <LoaderOne />
            </div>
        </Layout>
    )

    return (
       <Layout description = "the vault products page">
            <div className = {styles.products}>
                <h3>Available Products</h3>
                <div className={styles.product__container}>
                    {
                        data.products.map( product => <ProductCard key = {product._id} product = {product}/>)
                    }
                </div>
            </div>
        </Layout>
    )
}

export default products
