import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import {
    Accordion,
    AccordionHeader,
    AccordionBody
  } from "@material-tailwind/react";
import Loading from '../components/Loading';

const Peminjaman = () => {
    const [peminjaman, setPeminjaman] = useState([])
    const [pembayaran, setPembayaran] = useState([])
    const [open, setOpen] = useState(0);
 
    
    
    const GetInfo = async () => {

        const id_borrower = window.location.pathname.split('/')[2]
        const token = localStorage.getItem("token2");
        try {
            await axios.get(`http://localhost:8080/listBorrower/${id_borrower}` , {
                headers :
                    {      
                        "authorization": token,      
                    } 
            })
            .then((response) =>{
                setPeminjaman(response.data.peminjaman)
                setPembayaran(response.data.pembayaran)

            })
            console.log(peminjaman);
            console.log(pembayaran);

        } catch (err) {
            console.log(err);
        }
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
            <div className="container mx-auto bg-gray-100 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 px-4 xl:p-0 gap-4 xl:gap-6">
                    <div className="col-span-1 lg:col-span-2 flex justify-center">
                    <h2 className="text-xl md:text-lg text-gray-700 font-bold tracking-wide md:tracking-wider my-5 uppercase">
                        Informasi Peminjaman
                    </h2>
                    
                    </div>
                    <div  className="bg-white p-5 rounded-xl border border-gray-50 ">
                        <div className="flex justify-center pb-4">
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                Detail Peminjaman
                            </span>
                        </div>
                        <div className="grid grid-cols grid-cols-1 md:grid-cols-2 gap-2">
                   
                            <div className="bg-gray-100 p-2 rounded-sm gap-2">
                                <img className='h-10 items-center justify-center m-auto' src={peminjaman.foto_diri} alt="foto"/>
                                <div>{peminjaman.nama_lengkap}</div>
                                <div>{peminjaman.email}</div>
                                <div>{peminjaman.phone}</div>
                                <div>{peminjaman.alamat_tinggal}</div>
                            </div>
                            <div className=" bg-gray-300 p-2 rounded-sm gap-2">
                                <div>{peminjaman.pinjaman_ke}</div>
                                <div>Rp. {peminjaman.loan_amount}</div>
                                <div>{peminjaman.status}</div>
                                <div>{peminjaman.tenor}</div>
                                <div>Rp {peminjaman.total_payment}</div>
                                <div>{peminjaman.target_lunas}</div>
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
                                    <div className="flex flex-col bg-gray-200 p-2 rounded-sm mt-2 gap-2">
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
                                            
                                            <p className='text-s font-medium'>Rp.{p.amount_payment} </p>
                                            <a href="#"className="text-s px-2 rounded-md bg-yellow-500 hover:bg-yellow-200">lihat</a>
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
            </div>
        }
        </div>

    )
}

export default Peminjaman