import { useState, useEffect } from "react";
import axios from 'axios';


type ApiDataType={
  isError:boolean,
  errorMsg?:string,
  data?:[]
}

const useFetch = (url:string) => {
  const [data, setData] = useState<ApiDataType>();

  useEffect(() => {

    const init=async ()=>{
      try {
        let apiData=await axios.get(url);
        setData( {isError:false, data:apiData.data})
      } catch (err) {
        setData( {isError:false, errorMsg:'Something Went wrong!'})
      }
        
    }
    
    init();

  }, [url]);

  return data;
};

export default useFetch;