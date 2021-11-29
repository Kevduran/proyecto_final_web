import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BiText, BiPencil, BiImageAdd, BiPlus } from 'react-icons/bi';
import './admin.css'
import { Input } from 'postcss';

const TOKEN_KEY = "token";

export default function Admin() {
    const navigate = useNavigate()
    const { logout } = useUserContext()
    const [page, setPage] = useState(0)
    const [error, setError] = useState(false);

    const [dataForm, setDataForm] = useState({
        title: "",
        description: "",
        image: "",
        _id: ""
    })

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    const Formulario = () => {
        document.getElementById('formulario').style.display = 'block'
    }
    
    const FormularioUpdate = () => {
        document.getElementById('formularioUpdate').style.display = 'block'
    }

    const borrar_btn = () => {
        document.getElementById('delete').style.display = 'block'
    }

    const siguiente = () => {
        console.log(page)
        setPage(page + 1)
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE and Opera
        //window.location.reload()
    }

    const anterior = () => {
        console.log(page)
        setPage(page - 1)
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE and Opera
        //window.location.reload()
    }

    const handleInputChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name] : e.target.value
        })
    }

    const getToken = () => localStorage.getItem(TOKEN_KEY);

    const enviarDatos = async (event) => {
        event.preventDefault();
        const lsToken = getToken();
        try{
            const res = await fetch(`${BASE_URL}/post/create`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${lsToken}`
                },
                body: JSON.stringify({
                    title: dataForm.title,
                    description: dataForm.description,
                    image: dataForm.image
                })
            })
            setError(!res)
        } catch (error) {
            console.error({error});
            console.error("Error en Enviar Valores");
        } finally {
            document.getElementById('formulario').style.display = 'none'
        }
    }

    const ActualizarData = async (event) => {
        event.preventDefault();
        const lsToken = getToken();
        try{
            const res = await fetch(`${BASE_URL}/post/update/${dataForm._id}`, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${lsToken}`
                },
                body: JSON.stringify({
                    title: dataForm.title,
                    description: dataForm.description,
                    image: dataForm.image
                })
            })
            if(res.ok){
                alert("Datos Actualizados")
            }
        } catch (error) {
            console.error({error});
            console.error("Error en Enviar Valores");
        } finally {
            document.getElementById('formularioUpdate').style.display = 'none'
        }
    }

    const ocultarDatos = async (event) => {
        event.preventDefault();
        const lsToken = getToken();

        try{
            const res = await fetch(`${BASE_URL}/post/toggle/${dataForm._id}`, {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${lsToken}`
                }
            })
            if(res.ok){
                alert("Post Borrado")
            }
        } catch (error) {
            console.error({error});
            console.error("Error en Enviar Valores");
        } finally {
            document.getElementById('delete').style.display = 'none'
        }
    }

    let paginas;
    let posts = [];
    let respuesta = [];
    const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

    const renderElement = ({ _id, title, image, description}) => {
        return `
            <li class="card" data-id="${ _id }">
                <div class="card-main">
                    <h2 id="titulo">${ title }</h2>
                    <img id="imagen" src="${ image }">
                    <button className="Description" id="description_btn" >descripción</button>
                    <span class="description" id="descriptionHide">
                        <p>${ description }</p>
                    </span>
                    <div class="id"> ${ _id }</div>
                </div>
            </li>
        \n
        `
    }

    const renderList = () => {
        const postList = document.querySelector("#posts");

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
        respuesta = await FetchData(`${BASE_URL}/post/all?limit=10&page=${page}`) ?? [];
        Asignar(respuesta);
        renderList();
    }
    const Asignar = (data) => {
        posts = data.data;
        paginas = data.pages;
    }

    const Administrador = () => {
        fetchPosts();
    }

    window.addEventListener("load",Administrador())

    return (
        <div className="container mx-auto">
            <nav className="bg-green-800 shadow-lg">
                    <div className="sm:flex justify-around">
                        <div className="text-yellow-500 text-3xl font-bold p-3">ADMINISTRADOR</div>
                        <ul className="text-yellow-300 sm:self-center text-xl border-t sm:border-none">
                            <li className="sm:inline-block">
                                <button id="create_btn" onClick={Formulario} className="p-3 hover:text-white">Crear</button>
                            </li>
                            <li className="sm:inline-block">
                                <button className="p-3 hover:text-white" onClick={FormularioUpdate}>Actualizar</button>
                            </li>
                            <li className="sm:inline-block">
                                <button className="p-3 hover:text-white" onClick={borrar_btn}>Borrar</button>
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

            <div className="content-center mb-4"  id="delete">
                <input className="font-medium mr-2 border border-gray-200 text-gray-700 focus:outline-none focus:border-3 focus:bg-gray-100 p-2 rounded" 
                    type="text" 
                    placeholder="id..."
                    name="_id"
                    onChange={handleInputChange}/>
                <button onClick={ocultarDatos} className="transition rounded border border-green-800 duration-300 ease-in-out text-lg text-extrabold bg-purple-800  hover:bg-opacity-40 hover:text-gray-600 py-1 px-2 text-gray-100">Eliminar</button>
            </div>

            <div id="formulario" className="justify-center mb-12 mx-auto w-2/6 max-w-3xl bg-green-800 border-green-500 rounded-md md:p-12">
                <form onSubmit={enviarDatos} className="flex flex-col gap-4 ">

                    <h2 className="uppercase text-yellow-500 font-monserrat font-black mx-auto text-4xl">New Post</h2>

                    <div className="w-full">
                        <BiText className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                        <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                            type = 'text'
                            placeholder = 'Titulo...'
                            minLength = "8"
                            maxLength = "32"
                            name="title"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="w-full">
                        <BiPencil className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                            <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                                type='text'
                                minLength = "8"
                                placeholder="Descripción..."
                                name="description"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="w-full">
                        <BiImageAdd className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                            <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                                type='url'
                                placeholder="Imagen..."
                                name="image"
                                onChange={handleInputChange}
                            />
                    </div>


                    {error && <p className="w-full rounded p-3 text-center text-white font-roboto bg-red-700 select-none">
                        Datos Erroneos
                    </p>}

                    <button type="submit" className="mt-6 w-full transition rounded duration-300 ease-in-out text-xl text-extrabold uppercase bg-purple-800 hover:bg-blue-700 py-2 px-4 text-gray-100"><BiPlus className="w-1/5 font-black mx-auto text-4xl"/></button>
                </form>
            </div>

            <div id="formularioUpdate" className="justify-center mb-12 mx-auto w-2/6 max-w-3xl bg-green-800 border-green-500 rounded-md md:p-12">
                <form onSubmit={ActualizarData} className="flex flex-col gap-4 ">

                    <h2 className="uppercase text-yellow-500 font-monserrat font-black mx-auto text-4xl">Update Post</h2>

                    <div className="w-full">
                        <BiText className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                        <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                            type = 'text'
                            placeholder = 'Id...'
                            name="_id"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="w-full">
                        <BiText className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                        <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                            type = 'text'
                            placeholder = 'Titulo...'
                            minLength = "8"
                            maxLength = "32"
                            name="title"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="w-full">
                        <BiPencil className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                            <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                                type='text'
                                minLength = "8"
                                placeholder="Descripción..."
                                name="description"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="w-full">
                        <BiImageAdd className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                            <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                                type='url'
                                placeholder="Imagen..."
                                name="image"
                                onChange={handleInputChange}
                            />
                    </div>


                    {error && <p className="w-full rounded p-3 text-center text-white font-roboto bg-red-700 select-none">
                        Datos Erroneos
                    </p>}

                    <button type="submit" className="mt-6 w-full transition rounded duration-300 ease-in-out text-xl text-extrabold uppercase bg-purple-800 hover:bg-blue-700 py-2 px-4 text-gray-100"><BiPlus className="w-1/5 font-black mx-auto text-4xl"/></button>
                </form>
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