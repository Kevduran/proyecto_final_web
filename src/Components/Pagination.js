import React, { useState } from 'react'
import { useUserContext } from '../contexts/UserContext';

const Pagination = () => {

    let respuesta = [];
    const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

    const [page, setPage] = useState(0)

    const FetchData = async (url) => {
        let data = undefined;
        const { login, token } = useUserContext();
        try{

            const response = await fetch(url , {
                "method": "GET",
                "headers": {
                    "Content-type": "application.json",
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.ok){
                data = await response.json();
            } else {
                console.warn("invalid request")
            }
        }
        catch(error){
            console.error({error});
            console.error("Error in fetch data");
        }
        finally{
            return data;
        }
    }

    const pages = async () => {
        respuesta = await FetchData(`${BASE_URL}/post/all?limit=10&page=${page}`) ?? [];
    }

    return (
        <li>
            holaa
        </li>
    )
}

export default Pagination