import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then(data => data.data)

const getProducts = () => {

    const {data, error} = useSWR('http://localhost:3000/api/products', fetcher)
   
    return {
        data: data,
        loading: !error && !data,
        error: error
      }
}


export { getProducts }