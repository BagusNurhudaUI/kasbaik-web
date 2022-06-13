import { useNavigate } from "react-router-dom";

export default function NotAuth (req, res) {
    const navigate = useNavigate()
    const notAuth = () => {
        console.log('clicked');
        navigate("/")
    }
    return (
        <div>
                    <div>anda belum terautentikasi </div>
                    <button onClick={notAuth}>go to login page</button>
                </div>
    )
}