import axios from 'axios';
import React, {useState, useHistory, useEffect} from 'react';
import {Navigate, Route, useNavigate,} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Navbar from '../components/Navbar';
import ClipLoader from "react-spinners/ClipLoader";

export default function Home (){
    const [jwt, setjwt] = useState('');
    const [isAuth, setisAuth] = useState(false);
    const [cookies, setCookie] = useCookies('');
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const navigate = useNavigate()
    let [loading, setLoading] = useState(true);
    
    // const GetToken = () => { 
    //     console.log('masuk ke get token');
    // }
    const GetInfo = async(e) => {
        console.log('masuk ke get info');
        const token = localStorage.getItem("token2") || "";
        try {
            await axios.get('http://localhost:8080/home', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) =>{
                console.log(response.data.user);
                setUser(response.data.user)
                setisAuth(true)
                // setProfile(response.data.profile)
                // console.log(user)
            })
            
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            }
        }
        
    }

    const notAuth = () => {
        console.log('clicked');
        navigate("/")
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        console.log('useEffect');
        GetInfo()
    }, [])

    

    return (
        
        <div> {
            loading ? 
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ClipLoader 
                 loading={loading} css size={100} />
            </div>

             : 
            isAuth ? 
            <div>
            <Navbar id_user={user.id_user}/>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">Hello, Selamat datang {user.username} </h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* <!-- Replace with your content --> */}
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                </div>
                {/* <!-- /End replace --> */}
                </div>
            </main>
            
            <div>Halo, Selamat datang {user.username} !</div>
            <button>Click</button>
            </div>
            : 
                <div>
                    <div>anda belum terautentikasi </div>
                    <button onClick={notAuth}>go to login page</button>
                </div>
            }
        </div>
       
        
        
    )
}