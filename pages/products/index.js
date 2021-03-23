import { useState, useRef, useEffect } from 'react'
import Layout from "../../components/Layout"
import { getProducts } from "../../swr/productsHook"
import styles from '../../styles/products.module.scss'
import LoaderOne from "../../components/LoaderOne"
import ProductCard from '../../components/ProductCard'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'



const products = () => {

    const router = useRouter()

    const { data, loading } = getProducts() 
    const searchRef = useRef(null)
    const brandsRef = useRef(null)
    const [ brands, setBrands ] = useState([]) 
    const [ filterOpen, setFilterOpen ] = useState( router.query.search ? true : false )
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ filteredData , setFilteredData ] = useState([])
    const [ filteredBrands, setFilteredBrands ] = useState([])
   


    useEffect(() => {
        const brandList = data ? Array.from(new Set(data.products.map((product)=> product.brand))) : []
        setBrands(brandList)
    }, [data])

    

    // Somewhat hacky way to link to pass search data from landing page. Passes search in the form or url query.. and then quickly changes url back via shallow route
    useEffect(() => {
        if(router.query.search && brandsRef && data){
            const filtered = data.products.filter( product => product.brand.toLowerCase().includes(router.query.search.toLowerCase())) 
            setFilteredBrands(filtered)
            brandsRef.current.value = router.query.search
            router.push('/products', undefined, { shallow: true })
        }
    }, [brands])


    const handleSearch = (e) => {
        e.preventDefault()
        brandsRef.current.value = 'All'
        setFilteredBrands([])
        setSearchQuery(searchRef.current.value)
        const filtered = data.products.filter(product => product.name.toLowerCase().includes(searchRef.current.value))
        setFilteredData(filtered)
    }

    const handleBrandSubmit = (e) => {
        e.preventDefault()
        if(brandsRef.current.value === 'All'){
            setFilteredBrands([])
            return 
        }
        setSearchQuery('')
        setFilteredData([])
        setFilteredBrands([])
        if(searchRef.current) searchRef.current.value = ''  
        const filtered = data.products.filter( product => product.brand.toLowerCase().includes(brandsRef.current.value.toLowerCase())) 
        setFilteredBrands(filtered)
    }

    const clearFilter = () => {
        if(brandsRef.current) brandsRef.current.value = 'All'
        setSearchQuery('')
        setFilteredData([])
        setFilteredBrands([])
        if(searchRef.current) searchRef.current.value = ''  
    }





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
                <div className = {styles.filter}>
                    <div className= {styles.filter__container}>
                        <div className = {styles.search__head}  onClick = {()=>  setFilterOpen( p => !p)}>
                                <h4>Filter Your Results</h4>
                                <i className= {["fas fa-chevron-down" , filterOpen && styles.rotate].join(' ')}></i>
                        </div>
                        { filterOpen && 
                            <div className = {styles.search__body}>
                               <form onSubmit = {handleSearch} className = {styles.search__form}>
                         
                                   <input type="text" id = 'keyword' ref = {searchRef} placeholder = 'Search Product By Name' />
                                   <button className = {styles.search__btn}>Search By Name</button>
                               </form>
                          
                               <form className = {styles.search__category} onSubmit = {handleBrandSubmit}>
                               
                                   <select name="" id="category__select" ref = {brandsRef}>
                                       <option value="All">All</option>
                                       {
                                           brands.map(brand => <option key = {brand} value = {brand}>{brand}</option>)
                                       }
                                   </select>
                                   <button className = {styles.search__btn}>Search By Brand</button>
                               </form>
                            </div>
                        }

                    </div>
                    

                </div>
                {
                    filteredData.length < 1 && filteredBrands.length < 1 && searchQuery.length === 0  ?
                    <h3>Available Products</h3>:
                    filteredData.length < 1 && filteredBrands.length < 1 ?
                        (
                        <div className= {styles.search__notify}>
                            <h5>No Search Results for: <span>{searchQuery}</span></h5> 
                            <button onClick = {clearFilter} >Clear Search</button>
                        </div>
                        )
                     :
                        (
                        <div className= {styles.search__notify}>
                            {
                                searchQuery.length > 0 ? <h5>Products Matching Search: <span> {searchQuery}</span></h5> :
                                <h5>Products of Brand: <span> {brandsRef.current.value} </span></h5> 
                            }
                            <button onClick = {clearFilter} >Clear Search</button>
                        </div>
                        )
                }
                <div className={styles.product__container}>
                    {
                        filteredData.length < 1 && filteredBrands.length < 1 && searchQuery.length === 0 ?
                        data.products.map( product => <ProductCard key = {product._id} product = {product}/>)
                        :
                        filteredData.map(  product => <ProductCard key = {product._id} product = {product}/>)
                    }
                    {
                        
                        filteredBrands.length > 0 ?
                        filteredBrands.map( product => <ProductCard key = {product._id} product = {product}/>) :
                        null
                    }
                </div>
            </div>
     
        </Layout>
    )
}

export default products
