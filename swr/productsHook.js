import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then(data => data.data)

export const getProducts = () => {

    const {data, error} = useSWR(`api/products`, fetcher)
   
    return {
        data: data,
        loading: !error && !data,
        error: error
      }
}


