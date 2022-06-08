import axios from 'axios';
import React, {useState, useHistory, useEffect} from 'react';
import {Navigate, Route} from 'react-router-dom'
import { useCookies } from 'react-cookie';

export default function Home (){
    const [jwt, setjwt] = useState('');
    const [cookies, setCookie] = useCookies('');


    


    // const GetToken = () => { 
    //     console.log('masuk ke get token');
    // }
    const GetInfo = async(e) => {
        console.log('masuk ke get info');
        console.log(localStorage.getItem('token1'));
        const token = localStorage.getItem("token2") || "";
        try {
            await axios.get('http://localhost:8080/home', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) =>{
                console.log(response.data);
            })
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response);
            }
        }
        
    }
    useEffect(() => {
        
        GetInfo();
    }, []);
    return (
        <div>
            <div>This is home</div>
        <button onClick={GetInfo}>Click</button>
        </div>
        
    )
}