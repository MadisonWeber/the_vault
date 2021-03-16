import { useEffect, useState, useContext } from 'react'
import { GlobalState } from '../../store/GlobalState'
import ACTIONS from '../../store/actions'
import Layout from '../../components/Layout'
import LoaderOne from '../../components/LoaderOne'
import axios from 'axios'
import Link from 'next/link'
// import Product from "../../models/product.model"
import { useRouter } from 'next/router'
import styles from '../../styles/productpage.module.scss'

const singleproduct = ({data}) => {

    const { state, dispatch } = useContext(GlobalState)
    const { user, cart } = state


    const [ product, setProduct ] = useState('')
    const [ bigImage, setBigImage ] = useState('')

    useEffect(() => {
        setProduct(data)
        setBigImage(data.heroImage)
    }, [])

    const router = useRouter()


    const handleAddCart = (product) => {
        
        if(!user.name){
            dispatch({type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : 'You must be signed in to add an item to the cart'}})
            setTimeout(()=> {
                dispatch({ type : ACTIONS.CLEAR_MESSAGE})
            }, 2200)
            return 
        }
        
        const cartIds = cart.map( item => item._id)
       
        
        if(cartIds.includes(product._id)){
            dispatch({type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : 'That item is already in your Cart'}})
            
            setTimeout(()=> {
                dispatch({ type : ACTIONS.CLEAR_MESSAGE})
            }, 1800)

        }else{

            product.quantity = 1
            dispatch({type : ACTIONS.ADD_CART, payload : product})

            setTimeout(()=> {
                dispatch({ type : ACTIONS.CLEAR_MESSAGE})
            }, 1800)
        }
    }





    if(router.isFallback) {
        return (
            <Layout description = 'Vault Product Page'>
                <LoaderOne/>
            </Layout>
        )
    }

    return (
        <Layout description = 'Vault Product Page'>
            <h2 className = {styles.feature__name}>{product.name}</h2>
            <div className = {styles.single__product}>
                <div className={styles.product__left}>
                    <img className = {styles.feature__image} src={bigImage} alt="hero"/>
                    <div className = {styles.img__container}>
                        {
                            product.images && product.images.map( (image, index) => {
                                return <img className = {styles.sec__img}
                                key = {index}
                                src = {image}
                                alt = {image}
                                onMouseEnter = {() => setBigImage(product.images[index])}
                                onMouseLeave ={() => setBigImage(product.heroImage)}
                                />
                            })
                        }
                    </div>
                </div>
                <div className={styles.product__right}>
                    <h5 className = {styles.brand}>{product.brand}</h5>
                    <h2 className = {styles.name}>{product.name}</h2>
                    <p className = {styles.description}>{product.description}</p>
                    <p className = {styles.price}> $ {product.price}</p>
                    <button className = {styles.add__cart} onClick = {()=> handleAddCart(product)}>Add To Cart</button>
                    <Link href = "/cart"><button className = {styles.return}>Go To Cart</button></Link>
                </div>
   
            </div>
            {/* <button className = {styles.go__back}><i class="fas fa-arrow-left"></i>Back to Products Page</button> */}
        </Layout>
    )
}

export default singleproduct


export const getServerSideProps = async ({params}) => {

        const { id } = params
        const { data } = await axios.get(`http://localhost:3000/api/products/${id}`)
    
        return { 
            props: {
                data 
            }
        }
}

// This is working but is extemely slow in development and keeps logging user out.. may go back to it later
// export const getStaticPaths = async () =>{
   
//     const { data } = await axios.get('http://localhost:3000/api/products/')
//     const paths = data.products.map( product => (
//             {params : { id : product._id}}
//         )
//     )

//     return { paths, fallback : true }
// }


// export const getStaticProps = async ({params}) => {
//     const { id } = params
//     // const { data } = await axios.get(`http://localhost:3000/api/products/${id}`)
//     // You could fetch this from the api... but because getStaticProps runs on server, you can get data right from DB

//     const res = await Product.findById(id)

//     const data = JSON.parse(JSON.stringify(res))
//     // Stupid workaround for serilization error

//         return {
//         props :{
//            data : data
//         },
//         revalidate : 30, //Data is incrementally regenerated every 30 seconds
//     }
// }