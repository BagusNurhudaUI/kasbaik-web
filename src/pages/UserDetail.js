import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { BrowserRouter as Router, Routes,  Route, useParams} from 'react-router-dom';

const UserDetail = (id) => {

    const [profile, setProfile] = useState([])
    const [peminjaman, setPeminjaman] = useState([])
    console.log(window.location.pathname.split('/')[2]);
    const id_user = window.location.pathname.split('/')[2]

    const getUserDetails = async () => {
        console.log('didalam getuser',id_user);
        const token = localStorage.getItem("token2");
        try {
            await axios.get(`http://localhost:8080/useradmin/${id_user}` , {
                headers :
                    {      
                        "authorization": token,      
                    } 
            })
            .then((response) =>{
                console.log(response.data);
                setProfile(response.data.profile)
                setPeminjaman(response.data.peminjaman)
            })

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])
    
    return (
        <>
            <Navbar />
            <h1>ini bagian user detail</h1>
            <h1>{id_user}</h1>
            <button onClick={getUserDetails}>CLick This</button>
            <h1>{JSON.stringify(profile)}</h1>
            <h1>{JSON.stringify(peminjaman)}</h1>
        </>
    )
}

export default UserDetail