import axios from "axios";
import { isEmptyArray } from "formik";
import { useState, useEffect } from "react";


const useFetchMultiple = (endpoint,paramName, ids) =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  

    const fetchData = async(id) => {
        const options = {
            method: 'GET',
            url: `https://jsearch.p.rapidapi.com/${endpoint}`,
            params: {[paramName]: id},
            headers: {
                'X-RapidAPI-Key': '***REMOVED***',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };
        setIsLoading(true)
        try {
            const response = await axios.request(options)
            return response.data.data
        } catch (error) {
            setError(error)
            console.log("Error(useFetchMultiple):", error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }
    // const fetchAllData = async () => {
    //     setIsLoading(true);
    //     try {
    //       const promises = ids.map(id => fetchData(id));
    //       const results = await Promise.all(promises);
    //       setData(results.filter(data => data !== null));
    //     } catch (error) {
    //       setError(error);
    //       alert('There is an error');
    //     } finally {
    //       setIsLoading(false);
    //     }
    // }

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
          const results = [];
          for (const id of ids) {
            const dataForId = await fetchData(id);
            if (dataForId !== null) {
              results.push(dataForId[0]);
            }
            console.log("Fetched "+id+" :", dataForId[0].employer_name)
            // Introduce a delay between requests (e.g., 1000 milliseconds or 1 second) due to limitation is free plan of Rapid API
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          setData(results);
        } catch (error) {
          setError(error);
          console.log("Error(useFetchMultuple):", error)
          alert('There is an error');
        } finally {
          setIsLoading(false);
        }
    }

    useEffect(() => {
        if (ids.constructor === Array && ids.length > 0) {
          fetchAllData();
        }
      }, [ids, paramName]);
    
    
    const refetch = () =>{
        setIsLoading(true)
        fetchAllData()
    }

    return {data, isLoading, error, refetch}
}

export default useFetchMultiple