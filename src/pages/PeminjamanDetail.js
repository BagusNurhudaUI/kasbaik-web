import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import {
    Accordion,
    AccordionHeader,
    AccordionBody
  } from "@material-tailwind/react";
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import client from '../config.js'
import { useNavigate } from 'react-router-dom';

const Peminjaman = () => {
    const [peminjaman, setPeminjaman] = useState([])
    const [pembayaran, setPembayaran] = useState([])
    const [mitra, setMitra] = useState([])
    const [open, setOpen] = useState(0);
 
    
    
    const GetInfo = async () => {

        const id_borrower = window.location.pathname.split('/')[2]
        const token = localStorage.getItem("token2");
        try {
            await client.get(`/listBorrower/${id_borrower}` , {
                headers :
                    {      
                        "authorization": token,      
                    } 
            })
            .then( async (response) =>{
                setPeminjaman(response.data.peminjaman)
                setPembayaran(response.data.pembayaran)
                await client.get(`/mitraadmin/${response.data.peminjaman.id_mitra}` , {
                    headers :
                        {      
                            "authorization": token,      
                        } 
                })
                .then((response) => {
                    console.log(response.data);
                    setMitra(response.data.profile[0])
                })

            })
            console.log(peminjaman);
            console.log(pembayaran);

        } catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate()
    const goToPembayaranDetail = (id) => {
        navigate(`/pembayaran/${id}`)
    }

    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        GetInfo()
    }, [])

    return (
        <div>
            {loading ?
            <Loading loading={loading} />
            :
            <div className="bg-gray-100">
            <Navbar />
            <div className="container mx-auto bg-gray-100 h-full min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 px-4 xl:p-0 gap-4 xl:gap-6">
                    <div className="col-span-1 lg:col-span-2 flex justify-center">
                    <h2 className="text-xl md:text-lg text-gray-700 font-bold tracking-wide md:tracking-wider my-5 uppercase">
                        Informasi Peminjaman
                    </h2>
                    
                    </div>
                    <div  className="bg-white p-5 rounded-xl border border-gray-50 ">
                        <div className="flex justify-center pb-6">
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                ------------------
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                        <div className="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
                            <div class="flex flex-col items-center pb-5">
                                <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src={peminjaman.foto_diri === null ? require('../assets/png/account1.png') : peminjaman.foto_diri} alt="foto"/>
                                <h5 class="mb-1 text-xl font-medium text-gray-600 "> {peminjaman.nama_lengkap} </h5>
                            </div> 
                            <div className="flex flex-col space-y-4 md:justify-start p-3 pt-5 rounded-md font-medium bg-gray-100 ">
                                <div className="flex justify-center">
                                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                    Informasi Akun
                                </span>
                                </div>
                                <div className=" flex flex-col space-y-3">
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Phone   : {peminjaman.phone}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Umur    : {peminjaman.usia}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Profesi   : {peminjaman.profesi}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Jenis Kelamin   : {peminjaman.gender}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Alamat   : {peminjaman.alamat_tinggal}
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col justify-between ">
                        <div className="flex flex-col">
                            <p className="text-gray-700 font-bold mb-4">Detail Peminjaman</p>
                            <div className="mt-1 text-gray-700 font-normal max-w-sm justify-start">
                            <div className=" flex flex-col space-y-3 font-medium md:text-md sm:text-s">
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Nama Mitra : {mitra.partner_name}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-gray-600 flex justify-between">
                                    Jumlah Pinjam : Rp.{peminjaman.loan_amount.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Peminjaman ke : {peminjaman.pinjaman_ke}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Alasan Peminjaman   : {peminjaman.reason_borrower}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Status: {peminjaman.status}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Target Lunas: {peminjaman.target_lunas}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Total Bayar: Rp.{peminjaman.total_payment.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                        
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-50 ">
                        <div className="flex justify-center pb-4">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Riwayat Pembayaran
                        </span>
                        </div>
                    <div className='overflow-auto max-h-full'>
                        <div className="flex flex-col  ">
                            {pembayaran[0] === undefined || null ? <div>belum ada pembayaran</div> : 
                            pembayaran.map(p => {
                                return (
                                    <div className="flex flex-col bg-gray-200 p-2  mt-2 gap-2 rounded-md">
                                        <div className="flex justify-between ">
                                            <div className='flex justify-between'>
                                                <img src={require('../assets/png/currency-usd.png')} alt='logo' className='h-4 w-auto'/>
                                                <p className='text-xs px-2'>Pay-{p.payment_ke}</p>
                                            </div>
                                            <p className='text-xs '> {p.createdAt.split("T")[0]}</p>
                                            <p className='text-xs px-2 uppercase'>{p.payment_method}</p>
                                    
                                        </div>
                                        <div className="flex justify-between ">
                                            <div className='flex justify-between items-center'>
                                                <img src={require('../assets/png/bank.png')} alt='logo' className='h-4 w-auto items-center '/>
                                                <p className='text-xs px-2 flex align-text-bottom'>No.{p.pinjaman_ke}</p>
                                            </div>
                                            
                                            <p className='text-s font-medium'>Rp.{p.amount_payment.toLocaleString("id-ID")} </p>
                                            <div onClick={() => {
                                                goToPembayaranDetail(p.id_payment)
                                            }} className="cursor-pointer text-s px-2 rounded-md bg-yellow-500 hover:bg-yellow-200">lihat</div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                            
                        </div> 
                    
                    </div>
                        


                    </div>
                </div>
            </div>
            <Footer />
            </div>
        }
        </div>

    )
}

export default Peminjaman