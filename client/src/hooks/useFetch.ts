import { useState, useEffect } from "react";
import axios from 'axios';
import { UserInfoType } from "../types/user.type";
import { rolesType } from "../components/forms/UserForm";


export type ApiDataType={
  isError:boolean,
  errorMsg?:string,
  data?:{
    count:number,
    data:UserInfoType[] | rolesType[],
    success:boolean

  },
}

const useFetch = (url:string) => {
  const [data, setData] = useState<ApiDataType>();

  useEffect(() => {
    const init=async ()=>{
      try {
        let apiData=await axios.get(url);
        setData( {isError:false, data:apiData.data})
      } catch (err) {  
        console.log(err);
        setData( {isError:true, errorMsg:'Something Went wrong!'})
      }
      
    }

    init();
   

  }, [url]);

  return data?.data;
};

export default useFetch;