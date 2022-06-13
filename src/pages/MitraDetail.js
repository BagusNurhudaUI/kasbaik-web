import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { BrowserRouter as Router, Routes,  Route, useParams, useNavigate} from 'react-router-dom';
import { Menu } from '@headlessui/react'
import Loading from '../components/Loading';

const UserDetail = (id) => {

    const [profile, setProfile] = useState([])
    const [peminjaman, setPeminjaman] = useState([])
    const [payment, setPayment] = useState([])
    const id_mitra = window.location.pathname.split('/')[2]

    const getMitraDetails = async () => {
        const token = localStorage.getItem("token2");
        try {
            await axios.get(`http://localhost:8080/mitraadmin/${id_mitra}` , {
                headers :
                    {      
                        "authorization": token,      
                    } 
            })
            .then((response) =>{
                console.log(response.data);
                setProfile(response.data.profile[0])
                setPeminjaman(response.data.peminjaman)
                setPayment(response.data.paymenthistory)

            })
            console.log(profile);

        } catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate()
    const goToPeminjamanDetail = (id_borrower) => {
        navigate(`/peminjaman/${id_borrower}`)
    }

    const goToPembayaranDetail = (id_mitra) => {
        navigate(`/pembayaran/${id_mitra}`)
    }

    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        getMitraDetails()
    }, [])
    
    return (
        <div>
            {loading ?
            <Loading loading={loading} />
            :    
            <div>
            <Navbar />
            <div className="bg-gray-100 h-full ">
            <main className="container mx-w-6xl  mx-auto py-4 h-auto">
                <div className="flex flex-col space-y-8">
                <div className="col-span-1 lg:col-span-2 flex justify-center">
                    <h2 className="text-xl md:text-lg text-gray-700 font-bold tracking-wide md:tracking-wider my-5 uppercase">
                        Informasi Mitra
                    </h2>
                    
                    </div>
                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                    <div className="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
                    <div class="flex flex-col items-center pb-5">
                        <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src={profile.foto_profile === null ? require('../assets/png/account1.png') : profile.foto_profile} alt="foto"/>
                        <h5 class="mb-1 text-xl font-medium text-gray-400 ">{profile.partner_name} </h5>
                    </div> 
                    <div className="flex flex-col space-y-4 md:h-full md:justify-start">
                        <div className="flex justify-center">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Informasi Akun
                        </span>
                        </div>
                        <div className=" flex flex-col space-y-3">
                            <div className="flex justify-center">
                                <p className="text-xs text-gray-600 flex justify-between">
                            Phone   : {profile.phone}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <p className="text-xs text-gray-600 flex justify-between">
                            Umur    : {profile.usia}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <p className="text-xs text-gray-600 flex justify-between">
                            Profesi   : {profile.profesi}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <p className="text-xs text-gray-600 flex justify-between">
                            Jenis Kelamin   : {profile.gender}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <p className="text-xs text-gray-600 flex justify-between">
                            Alamat   : {profile.alamat_tinggal}
                                </p>
                            </div>
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
               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-4 xl:p-0 gap-4 xl:gap-6">
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
                    <h2 className="text-xs md:text-sm text-gray-700 font-bold tracking-wide md:tracking-wider">
                        Informasi Peminjaman
                    </h2>
                    
                    </div>
                    <div  className="bg-white p-5 rounded-xl border border-gray-50 ">
                        <div className="flex justify-center pb-4">
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                Riwayat Peminjaman
                            </span>
                        </div>
                        <div className="flex flex-col gap-4 overflow-auto max-h-72 " >
                            {peminjaman[0] === undefined ? null : 
                            peminjaman.map( p => {
                                return (
                                    <div className="flex flex-col bg-gray-100 p-2 rounded-sm gap-2 cursor-pointer" onClick={() => {goToPeminjamanDetail(p.id_borrower)}}>
                                        <div className="flex justify-between">
                                            <div className='flex justify-between'>
                                                <img src={require('../assets/png/bank.png')} alt='logo' className='h-4 w-auto'/>
                                                <p className='text-xs px-2'>No.{p.pinjaman_ke}</p>
                                            </div>
                                            <p className='text-xs '>{p.createdAt.split("T")[0]}</p>
                                            <p className='text-xs px-2 uppercase'>{p.status}</p>
                                    
                                        </div>
                                        <div className="flex justify-between items-center ">
                                            <p className='text-s'>tenor: {p.tenor}</p>
                                            <p className='text-s font-medium'>Rp. {p.loan_amount}</p>
                                            <a className="text-xs px-2 rounded-md bg-yellow-500 py-1">{p.total_payment !== null ?'Rp.' + p.total_payment : 'lihat'}</a>
                                        </div>
                                    </div>
                                )

                            })}
                            
                        </div>
                        
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-50 ">
                        <div className="flex justify-center pb-4">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Riwayat Pembayaran
                        </span>
                        </div>
                    <div className='overflow-auto max-h-72'>
                        {payment[0] === undefined ? null :
                            payment.map(p => {
                                return (
                                    <div className="flex flex-col cursor-pointer" onClick={() => {goToPembayaranDetail(p.id_mitra)}}>
                                        <div className="flex flex-col bg-gray-200 p-2 rounded-sm mt-2 gap-2">
                                            <div className="flex justify-between ">
                                                <div className='flex justify-between'>
                                                    <img src={require('../assets/png/currency-usd.png')} alt='logo' className='h-4 w-auto'/>
                                                    <p className='text-xs px-2'>Pay-{p.payment_ke}</p>
                                                </div>
                                                <p className='text-xs '>{p.createdAt.split("T")[0]}</p>
                                                <p className='text-xs px-2 uppercase'>{p.payment_method}</p>
                                        
                                            </div>
                                            <div className="flex justify-between ">
                                                <div className='flex justify-between items-center'>
                                                    <img src={require('../assets/png/bank.png')} alt='logo' className='h-4 w-auto items-center '/>
                                                    <p className='text-xs px-2 flex align-text-bottom'>No.{p.pinjaman_ke}</p>
                                                </div>
                                                
                                                <p className='text-s font-medium'>Rp.{p.amount_payment} </p>
                                                <a href="#"className="text-s px-2 rounded-md bg-yellow-500 hover:bg-yellow-200">lihat</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                       
                    </div>
                        


                    </div>
                </div>
               
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
               
                </div>
            </main>
            </div> 
        </div>
        }   
        </div>
        
    )
}

export default UserDetail