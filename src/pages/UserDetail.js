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
            <div className="bg-gray-100">
            <main className="container mx-w-6xl  mx-auto py-4 h-full ">
                <div className="flex flex-col space-y-8">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                    <div className="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
                    <div class="flex flex-col items-center pb-5">
                        <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src={require('../assets/png/favicon.png')} alt="Bonnie image"/>
                        <h5 class="mb-1 text-xl font-medium text-gray-400 ">Bonnie Green</h5>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                    </div> 
                    <div className="flex flex-col space-y-6 md:h-full md:justify-start">
                        <div className="flex justify-between">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Informasi Akun
                        </span>
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Total Pendanaan
                        </span>
                        </div>
                    </div>
                    </div>
                    <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-900 flex flex-col justify-between">
                    <div className="flex flex-col">
                        <p className="text-white font-bold">Selamat datang  ! </p>
                        <p className="mt-1 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm justify-start">
                        Ini merupakan aplikasi admin untuk melihat seluruh flow dari Kasbaik by Kitabisa. Apakah anda sudah melihat update terbaru mengenai pinjaman di Kasbaik? jika belum silahkan klik tombol dibawah ini..
                        </p>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                        <a
                        href="/peminjaman"
                        className="bg-yellow-500 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-yellow-400 hover:text-white"
                        >
                        Lihat Sekarang
                        </a>
                        <img
                        src={require('../assets/calendar.png')}
                        alt="calendar"
                        className="w-auto h-24 object-cover sm:h-16"
                        />
                    </div>
                    </div>
                </div>
                {/* End First Row */}
                {/* Start Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:p-0 gap-4 xl:gap-6">
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
                    <h2 className="text-xs md:text-sm text-gray-700 font-bold tracking-wide md:tracking-wider">
                        Informasi Kasbaik
                    </h2>
                    
                    </div>
                    <a href='/user' className="bg-white p-6 rounded-xl border border-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                        <p className="text-xs text-gray-600 tracking-wide">
                           Pengguna
                        </p>
                        <h3 className="mt-2 text-lg text-emerald-800 font-bold"></h3>
                        <span className="mt-2 text-xs text-gray-500">
                            Update terakhir 1 menit yang lalu
                        </span>
                        </div>
                        <div className="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <img
                            src={require('../assets/png/account.png')}
                            alt="icon"
                            className="w-auto h-10 md:h-6 xl:h-8 "
                        />
                        </div>
                    </div>
                    </a>
                    <a href='/mitra' className="bg-white p-6 rounded-xl border border-gray-50 ">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                        <p className="text-xs text-gray-600 tracking-wide">Mitra &amp; Partner</p>
                        <h3 className="mt-2 text-lg text-emerald-800 font-bold"></h3>
                        <span className="mt-2 text-xs text-gray-500">
                        Update terakhir 1 menit yang lalu
                        </span>
                        </div>
                        <div className="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <img
                            src={require('../assets/png/store.png')}
                            alt="icon"
                            className="w-auto h-10 md:h-6 xl:h-8 object-cover"
                        />
                        </div>
                    </div>
                    </a>
                </div>
                {/* End Second Row */}
                {/* Start Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                    <div className="col-start-1 col-end-5">
                    <h2 className="text-xs md:text-sm text-gray-800 font-bold tracking-wide">
                        Summary Transactions
                    </h2>
                    </div>
                    <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex justify-between items-center">
                        <div className="p-4 cursor-pointer border">
                        <span className="text-xs text-gray-500 font-semibold">Daily</span>
                        <h2 className="text-gray-800 font-bold tracking-wider">
                            $ 27.80
                        </h2>
                        </div>
                        <div className="p-4 cursor-pointer border">
                        <span className="text-xs text-gray-500 font-semibold">
                            Weekly
                        </span>
                        <h2 className="text-gray-800 font-bold tracking-wider">
                            $ 192.92
                        </h2>
                        </div>
                        <div className="p-4 cursor-pointer border">
                        <span className="text-xs text-gray-500 font-semibold">
                            Monthly
                        </span>
                        <h2 className="text-gray-800 font-bold tracking-wider">
                            $ 501.10
                        </h2>
                        </div>
                    </div>
                    {/* <img src= {require('../assets/png/login.jpg')}/> */}
                   
                    </div>
                    <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-gray-600 font-bold tracking-wide">
                        Riwayat Pembayaran Terakhir
                        </h2>
                        <a
                        href="/pembayaran"
                        className="px-4 py-2 text-xs bg-yellow-500 text-white rounded uppercase tracking-wider font-semibold hover:bg-yellow-400"
                        >
                        More
                        </a>
                    </div>
                    <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                        
                
                             <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                             <p className="px-4 font-semibold flex items-center"></p>
                             <p className="px-4 text-gray-600 flex items-center"></p>
                             <p className="px-4 tracking-wider flex items-center"></p>
                             <p className="px-4 text-emerald-800 flex items-center"></p>
                             <p className="md:text-base text-gray-800 flex items-center gap-2">
                                 Rp.
                             </p>
                             </li>
                            )
                           
                    </ul>
                    </div>
                </div>
                {/* End Third Row */}
                </div>
            </main>
            </div>
        </>
    )
}

export default UserDetail