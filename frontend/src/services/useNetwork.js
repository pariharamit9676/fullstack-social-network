import axios from "axios";

async function useNetwork({api, method="get", body}){
    
    if(method === 'get')
    {
        try{
            const data = await axios.get(`http://localhost:3000/api${api}`, body,
              {  withCredentials: true}
            )
            return data
        } catch(err){
            return err;
        }
    }
    if(method === 'post'){
        try{
            const data = await axios.post(`http://localhost:3000/api${api}`, body,{
                withCredentials: true
            })
            return data
        } catch(err){
            return err;
        }
    }

}

export default useNetwork;

