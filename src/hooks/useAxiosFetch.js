import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        // to cancel the request if the component is unmaunted.
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                  setData(response.data);
                  setFetchError(null)
                }
            } catch (error) {
                if (isMounted) {
                  setFetchError(error.message);
                  setData([]);
                }
            } finally {
              isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl);
        // to run when the dependecy changes.
        const cleanUp = () => {
          // console.log('cleanup function')
          isMounted = false;
          source.cancel();
        }
        
        return cleanUp;
    }, [dataUrl])

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;

