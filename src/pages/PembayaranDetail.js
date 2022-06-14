import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar'

const Pembayaran = () => {
    
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <>  
            {loading ? 
            <Loading />
            :
            <div>
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
                                <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src='' alt="foto"/>
                                <h5 class="mb-1 text-xl font-medium text-gray-600 "> </h5>
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
                                    Phone   : 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Umur    :
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Profesi   : 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Jenis Kelamin   : 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-xs text-gray-600 flex justify-between">
                                    Alamat   : 
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
                                    Nama Mitra : 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-gray-600 flex justify-between">
                                    Jumlah Pinjam : Rp.
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Peminjaman ke : 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Alasan Peminjaman   : 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Status: 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Target Lunas: 
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className=" text-gray-600 flex justify-between">
                                    Total Bayar: Rp.
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
                            <div className="flex flex-col bg-gray-200 p-2  mt-2 gap-2 rounded-md">
                                <div className="flex justify-between ">
                                    <div className='flex justify-between'>
                                        <img src={require('../assets/png/currency-usd.png')} alt='logo' className='h-4 w-auto'/>
                                        <p className='text-xs px-2'>Pay-</p>
                                    </div>
                                    <p className='text-xs '> </p>
                                    <p className='text-xs px-2 uppercase'></p>
                            
                                </div>
                                <div className="flex justify-between ">
                                    <div className='flex justify-between items-center'>
                                        <img src={require('../assets/png/bank.png')} alt='logo' className='h-4 w-auto items-center '/>
                                        <p className='text-xs px-2 flex align-text-bottom'>No.</p>
                                    </div>
                                    
                                    <p className='text-s font-medium'>Rp.</p>
                                    <div className="cursor-pointer text-s px-2 rounded-md bg-yellow-500 hover:bg-yellow-200">lihat</div>
                                </div>
                            </div>
                        </div> 
                    
                    </div>
                        


                    </div>
                </div>
            </div> 
                <Footer />  
            </div>
             
        }
            
        </>
    )
}

export default Pembayaran