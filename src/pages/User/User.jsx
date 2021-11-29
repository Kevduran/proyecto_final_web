import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function User() {
    const navigate = useNavigate()
    const { logout } = useUserContext()
    const [page, setPage] = useState(0)

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    const siguiente = () => {
        setPage(page + 1)
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
        //window.location.reload()
    }

    const anterior = () => {
        if(page <= 0)
        {

        }
        else
        {
            setPage(page - 1)
            document.body.scrollTop = 0; // Para Safari
            document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
            //window.location.reload()
        }

    }

    let paginas;
    let posts = [];
    let respuesta = [];
    const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

    /*const setupListeners = () => {
        const button = document.querySelector("#like_btn");
    
        button.addEventListener("click", () => {
            likingPost();
        });
    }*/

    const renderElement = ({id, title, image, description, user, comments}) => {
        return `
            <li class="card" data-id="${ id }">
                <div class="card-main">
                    <h2 id="titulo">${ title }</h2>
                    <img id="imagen" src="${ image }">
                        <p></p>
                        <p>${ description }</p>
                    <div id="buttons">
                        <button className="Like" id="like_btn" >Like \t</button>
                        <button className="Favorite" id="favorite_btn" >Favorito</button>
                        <button className="Comment" id="comment_btn" >Comment</button>
                    </div>
                </div>
            </li>
        \n
        `
    }

    const renderList = () => {
        const postList = document.querySelector("#posts");
        console.log(respuesta)
        const postsHTML = posts.reduce(
            (list, post) => (list + renderElement(post)), ""
        )
        postList.innerHTML = postsHTML;
    }

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

    const fetchPosts = async () => {
        respuesta = await FetchData(`${BASE_URL}/post/all?limit=12&page=${page}`) ?? [];
        Asignar(respuesta);
        renderList();
    }
    const Asignar = (data) => {
        console.log(data)
        posts = data.data;
        paginas = data.pages;
    }

    const Usuario = () => {
        fetchPosts();
    }


    window.addEventListener("load", Usuario())

    return (
        <div className="container mx-auto pb-4">
            <nav className="bg-green-800 shadow-lg w-full py-1 border px-2 ">
                    <div className="sm:flex justify-around">
                        <div className="text-yellow-500 text-3xl font-bold p-3">USUARIO</div>

                        <ul className="text-yellow-300 sm:self-center text-xl border-t sm:border-none">
                            <li className="sm:inline-block">
                                <a href="#" className="p-3 hover:text-white">Home</a>
                             </li>
                            <li className="sm:inline-block">
                                <a href="#" className="p-3 hover:text-white">Favoritos</a>
                            </li>
                            <li className="sm:inline-block">
                                <button onClick={logoutHandler} className="transition rounded border border-green-800 duration-300 ease-in-out text-lg text-extrabold uppercase hover:bg-yellow-700 py-2 px-8 text-gray-100">Log out</button>
                            </li>
                        </ul>
                    </div>
            </nav>
            <div className="sm:flex justify-center my-8">
                <input className="font-medium w-2/5 mr-2 border border-gray-200 text-gray-700 focus:outline-none focus:border-3 focus:bg-gray-100 p-2 rounded"
                    type="text"
                    placeholder="What do you want?"/>
                <button onClick={logoutHandler} className="transition rounded border border-green-800 duration-300 ease-in-out text-lg text-extrabold uppercase bg-yellow-600  hover:bg-opacity-40 hover:text-gray-600 py-2 px-8 text-gray-100">Buscar</button>
            </div>
            <ul id="posts"></ul>
            <div className="m-screen pt-8 space-x-2 flex justify-center">
                <button onClick={anterior} className="transition rounded border border-green-800 duration-300 ease-in-out text-lg text-extrabold uppercase bg-yellow-600  hover:bg-opacity-40 hover:text-gray-600 py-2 px-8 text-gray-100">last</button>
                <span className="bg-transparent my-3 px-2 py-1 rounded-lg text-black font-medium" > {page + 1} </span>
                <button onClick={siguiente} className="transition rounded border border-green-800 duration-300 ease-in-out text-lg text-extrabold uppercase bg-yellow-600  hover:bg-opacity-40 hover:text-gray-600 py-2 px-8 text-gray-100">Next</button>
            </div>
        </div>
    )
}