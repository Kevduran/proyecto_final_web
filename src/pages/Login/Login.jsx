import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BiUser, BiFace, BiLockAlt } from 'react-icons/bi';

import { useUserContext } from '../../contexts/UserContext';

export default function Login() {
    const { login, token } = useUserContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onChange = (e, save) => {
        save(e.target.value);
    }
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const logged = await login(username, password);

        setError(!logged);
        setUsername("");
        setPassword("");
    }

    if (token) {
        return <Navigate replace to="/redirect" />
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <main className="w-2/6 max-w-3xl bg-green-800 border-green-500 rounded-md md:p-12">
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 items-center justify-center">

                    <BiUser className="uppercase text-yellow-500 font-monserrat font-black text-8xl" />

                    <h2 className="uppercase text-yellow-500 font-monserrat font-black text-4xl">Progra web</h2>

                    <div className="w-full">
                        <BiFace className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                        <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                            type='text'
                            value={username}
                            placeholder='e.g. username'
                            onChange={(e) => onChange(e, setUsername)}
                        />
                    </div>

                    <div className="w-full">
                    <BiLockAlt className="text-yellow-500 w-1/5 float-left font-monserrat font-black text-4xl" />
                        <input className="font-medium float-right w-4/5 bg-yellow-100 text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                            type="password"
                            placeholder="e.g password"
                            onChange={(e) => onChange(e, setPassword)}
                            value={password}
                        />
                    </div>

                    {error && <p className="w-full rounded p-3 text-center text-white font-roboto bg-red-700 select-none">
                        Un error ha ocurrido en el inicio de sesión
                    </p>}

                    <button className="mt-6 w-full transition rounded duration-300 ease-in-out text-xl text-extrabold uppercase bg-blue-800 hover:bg-blue-700 py-2 px-4 text-gray-100">Sign In </button>
                </form>
            </main>
        </div>
    );
}