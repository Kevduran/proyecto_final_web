import { useNavigate } from 'react-router-dom';

const Beginning = () => {
    const navigate = useNavigate()

    const onClick = (e) => {
        navigate('/login')
    }

    return(
        <div className="flex gap-4 justify-center items-center p-6 min-h-screen bg-gray-200">
            <button className="font-roboto bg-gray-300 m-4 py-2 px-4 rounded" onClick={(e) => onClick(e)}>Go to Login</button>
        </div>
    );
}

export default Beginning;