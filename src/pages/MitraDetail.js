import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { BrowserRouter as Router, Routes,  Route, useParams, useNavigate} from 'react-router-dom';
import { Menu } from '@headlessui/react'
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import client from '../config.js'

const UserDetail = (id) => {

    const [profile, setProfile] = useState([])
    const [peminjaman, setPeminjaman] = useState([])
    const [payment, setPayment] = useState([])
    const id_mitra = window.location.pathname.split('/')[2]
    const [masuk, setMasuk] = useState(0)
    const [keluar, setKeluar] = useState(0)
    const [infoData, setInfoData] = useState([]);
    const [pesan, setPesan] = useState([]);

    const getMitraDetails = async () => {
        const token = localStorage.getItem("token2");
        try {
            await client.get(`/mitraadmin/${id_mitra}` , {
                headers :
                    {      
                        "authorization": token,      
                    } 
            })
            .then((response) =>{
                let totalPay = 0
                let totalGet = 0
                let acc =0, rej=0 , pen=0 , pay =0, done = 0 ;
                console.log(response.data);
                setProfile(response.data.profile[0])
                setPeminjaman(response.data.peminjaman)
                setPayment(response.data.paymenthistory)
                setPesan(response.data.message)
                response.data.paymenthistory.map(p => {
                    totalPay = totalPay + p.amount_payment
                }, [100])
                peminjaman.map(p => {
                    if(p.status === 'done' || p.status === 'payment'){
                        totalGet = totalGet + p.loan_amount
                    } 
                }, [100])
                setMasuk(totalPay)
                setKeluar(totalGet)
                response.data.peminjaman.map(p => {
                    if(p.status === 'done'){
                        done=done +1
                    }else if(p.status === 'payment'){
                        pay++
                    }else if(p.status === 'accepted'){
                        acc++
                    }else if(p.status === 'rejected'){
                        rej++
                    }else if(p.status === 'pending'){
                        pen++
                    }
                })
                const data = { done:done, pay:pay, acc:acc, rej:rej, pen:pen}
                setInfoData(data)
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
    }, [keluar, masuk])
    
    return (
        <div>
            {loading ?
            <Loading loading={loading} />
            :    
            <div className="bg-gray-100">
            <Navbar />
            <div className="bg-gray-100 h-full min-h-screen">
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
                    <div className="flex flex-col space-y-2 md:h-full md:justify-start">
                        <div className="flex justify-center">
                        <span className="text-s text-gray-500 font-semibold uppercase tracking-wider">
                            Informasi Akun
                        </span>
                        </div>
                        <div className=" grid grid-cols md:grid-cols-2 sm:grid-cols-1 justify-around  items-center gap-2 ">
                            <div className="flex flex-col gap-2 justify-center items-center p-2 flex font-medium bg-gray-100 rounded-md">
                                <p className="text-s text-gray-600 ">
                            Pemasukan
                                </p>
                                <p className="text-s text-gray-600 flex ">
                            Rp. {masuk.toLocaleString("id-ID")}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 p-2 bg-gray-100 font-medium rounded-md" >
                                <p className="text-s text-gray-600 flex ">
                            Pengeluaran
                                </p>
                                <p className="text-s text-gray-600 flex ">
                            Rp. {keluar.toLocaleString("id-ID")}
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
                                            <p className='text-s font-medium'>Rp. {p.loan_amount.toLocaleString("id-ID")}</p>
                                            <a className="text-xs px-2 rounded-md bg-yellow-500 py-1">{p.total_payment !== null ?'Rp.' + p.total_payment.toLocaleString("id-ID") : '----------'}</a>
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
                                    <div className="flex flex-col " >
                                        <div className="flex flex-col bg-gray-200 p-2 rounded-sm mt-2 gap-2">
                                            <div className="flex justify-between ">
                                                <div className='flex justify-between'>
                                                    <img src={require('../assets/png/currency-usd.png')} alt='logo' className='h-4 w-auto'/>
                                                    <p className='text-xs px-2'>Pay-{p.payment_ke}</p>
                                                </div>
                                                <p className='text-xs '>{p.createdAt.split("T")[0]}</p>
                                                <p className='text-xs px-2 uppercase'>{p.payment_method}</p>
                                        
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className='flex justify-between items-center'>
                                                    <img src={require('../assets/png/bank.png')} alt='logo' className='h-4 w-auto items-center '/>
                                                    <p className='text-xs px-2 flex align-text-bottom'>No.{p.pinjaman_ke}</p>
                                                </div>
                                                
                                                <p className='text-s font-medium'>Rp.{p.amount_payment.toLocaleString("id-ID")} </p>
                                                <div onClick={() => {goToPembayaranDetail(p.id_mitra)}}className="cursor-pointer text-xs px-2 py-1 rounded-md bg-yellow-500 hover:bg-yellow-200">lihat</div>
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
                    <div className="p-2 cursor-pointer border">
                        <span className="text-xs text-gray-500 font-semibold">Pending</span>
                        <h2 className="text-gray-800 font-normal tracking-wider pt-1">
                            {infoData.pen}
                        </h2>
                        </div>
                        <div className="p-2 cursor-pointer border">
                        <span className="text-xs text-gray-500 font-semibold">
                            Payment
                        </span>
                        <h2 className="text-gray-800 font-normal tracking-wider pt-1">
                            {infoData.pay}
                        </h2>
                        </div>
                        <div className="p-2 cursor-pointer border">
                        <span className="text-xs text-gray-500 font-semibold">
                            Rejected
                        </span>
                        <h2 className="text-gray-800 font-normal tracking-wider pt-1">
                            {infoData.rej}
                        </h2>
                        </div>
                        <div className="p-2 cursor-pointer border">
                        <span className="text-xs text-gray-500 font-semibold">
                            Done
                        </span>
                        <h2 className="text-gray-800 font-normal tracking-wider pt-1">
                            {infoData.done}
                        </h2>
                        </div>
                    </div>
                    
                   
                    </div>
                    <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-gray-600 font-bold tracking-wide">
                        Informasi Seputar Mitra
                        </h2>
                        <a
                        href="/pembayaran"
                        className="px-4 py-2 text-xs bg-yellow-500 text-white rounded uppercase tracking-wider font-semibold hover:bg-yellow-400"
                        >
                        More
                        </a>
                    </div>
                    <div className="divide-y-2 divide-gray-100 overflow-x-auto w-full mt-1 gap-1 rounded-md">
                        <div className="bg-gray-100 text-s pt-2">Total pesan : {pesan.length} </div>
                        <div className="bg-gray-100 text-s pb-2">Dana Pending : {(keluar-masuk).toLocaleString("id-ID")} </div>
                    </div>
                    </div>
                </div>
               
                </div>
            </main>
            </div> 
            <Footer />
        </div>
        }   
        </div>
        
    )
}

export default UserDetail