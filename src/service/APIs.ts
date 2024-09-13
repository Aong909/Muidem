import axios from "axios";

import { base_URL } from "../util/constant";


const APIService = {
    getAllData : () => {
        return axios.get(base_URL)
    },
    getByID: (id:string|undefined) => {
        return axios.get(base_URL + id)
    },
    putByID:  (id:string|undefined, param:any) => {
        axios.put(base_URL + id, param) 
    },
    deleteByID: (id:string|undefined) => {
        axios.delete(base_URL + id)
    },
    postData:  (param:any) => {
        axios.post(base_URL, param) 
    },
} 

export default APIService