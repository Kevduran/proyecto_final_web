import { FiAlertTriangle } from "react-icons/all";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()

    const onClick = (e) => {
        navigate('/login')
    }

    return(
        <div className="flex gap-4 justify-center items-center p-6 min-h-screen bg-gray-200">
            <FiAlertTriangle className="text-right w-56 h-56 text-red-500"/>
            <div className="items-center justify-around text-center">
                <h2 className="text-6xl font-roboto text-center mb-6 text-red-500">404</h2>
                <h3 className="text-xl font-roboto">well, this isn't good</h3>
                <h3 className="text-xl font-roboto">Press <a className="text-blue-500" href="https://answers.microsoft.com/en-us/windows/forum/all/error-code-404/9cd5b956-bc02-43fd-bfdc-17dc8b516463#:~:text=A%20404%20error%20is%20an,Cheers">here</a> for information</h3>
                <button className="font-roboto bg-gray-300 m-4 py-2 px-4 rounded" onClick={(e) => onClick(e)}>Go to Login</button>
            </div>
        </div>
    );
}

export default NotFound;