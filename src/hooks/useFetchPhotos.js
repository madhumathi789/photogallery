import { useState,useEffect } from "react";
const url="https://picsum.photos/v2/list?limit=30";
export default function useFetchPhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => 
    {
        const controller=new AbortController()
        async function load()
        {
            try{
                const res=await fetch(url,{signal:controller.signal});
                if(!res.ok) throw new Error(`Failed to fetch photos:${res.status}`);
                const data=await res.json();
                setPhotos(data);
            }
            catch(err)
            {
                if(err.name!=="AbortError")
                {
                    setError(err.message || "Something went wrong");
                }
            }
            finally{
                if(!controller.signal.aborted)
                {
                    setLoading(false);
                }
            }
        }
            load();
            return()=>{
                controller.abort();
            };
            },[]);
            return {photos,loading,error};
        }

        