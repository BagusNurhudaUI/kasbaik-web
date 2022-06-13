import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const Mitra = () => {
    const [mitra, setMitra] = useState([])
    const [borrower, setBorower] = useState([])
    const [pengeluaran, setPengeluaran] = useState([])
    const getUser = async () => {
        let temp = 0
        let data = []
        try {
            const token = localStorage.getItem("token2");
            await axios.get('http://localhost:8080/listAkunMitra', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) => {
                console.log(response.data);
                setMitra(response.data.mitra)
                setBorower(response.data.jumlahuser)
                response.data.jumlahuser.map(borrower => {
                    temp =0
                    borrower.map(b => {
                        if(b[0]){
                            temp=0
                        } else {
                            temp = temp + b.loan_amount
                        }

                    })
                    data.push(temp)
                    console.log(data);
                    
                })
                setPengeluaran(data)
                console.log('pengeluaran',pengeluaran);
            })
    
        } catch (err) {
            console.log(err);
        }
    }
    const navigate = useNavigate()
    const getMitraId =(id_mitra)=> {
        navigate(`/mitra/${id_mitra}`)
    }

    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
        {loading ? 
            <Loading loading={loading} />
        :

        <div className="bg-gray-100">
            <Navbar />
            <div className="container mx-auto bg-gray-100 h-full min-h-screen">
            <div className="grid grid-cols-1 px-4 xl:p-0 gap-4 xl:gap-6">
                    <div className="col-span-1  flex justify-center mt-5">
                        <h2 className="text-md md:text-lg text-gray-700 font-bold tracking-wide md:tracking-wider">
                            Informasi List Mitra
                        </h2>
                    
                    </div>
                    {mitra[0]=== undefined ? null : 
                    mitra.map((p, i) => {
                        return (
                            <div  className="bg-white p-4 rounded-xl border border-gray-50 ">
                        <div className='flex sm:flex-wrap md:justify-between gap-4'>
                            <div onClick={() => {getMitraId(p.id_mitra)}} class="flex justify-between space-x-3 sm:space-x-1 items-center cursor-pointer">
                                <img class="w-10 h-10 rounded-full " src={p.foto_profile === null ? require('../assets/png/account1.png') : p.foto_profile} alt="foto" />
                                <div class="space-y-0.5 font-sm text-gray-500 flex flex-col justify-start">
                                    <div className=" uppercase text-sm text-left ">{p.partner_name}</div>
                                    <div class="text-sm text-gray-500 ">{p.email}</div>
                                </div>
                            </div>
                            <div class="flex justify-between space-x-3 sm:space-x-1 items-center">
                                <img class="w-10 h-10 rounded-full " src={require('../assets/png/account-multiple-outline.png')} alt="foto" />
                                    <div className=" text-sm text-left ">{borrower[i].length} User</div>
                            </div>
                            <div class="flex justify-between space-x-3 sm:space-x-1 items-center">
                                <img class="w-10 h-10 rounded-full " src={require('../assets/png/book-information-variant.png')} alt="foto" />
                                <div class="space-y-0.5 font-sm text-gray-500 flex flex-col justify-start">
                                    <div className=" text-sm text-left ">Peminjaman : {borrower[i].length}</div>
                                    <div class="text-sm text-gray-500 ">Pembayaran :</div>
                                </div>
                            </div>
                            <div class="flex justify-between space-x-3 sm:space-x-1 items-center">
                                <img class="w-10 h-10 rounded-full " src={require('../assets/png/currency-usd.png')} alt="foto" />
                                <div class="space-y-0.5 font-sm text-gray-500 flex flex-col justify-start">
                                    <div className=" text-sm text-left ">Pemasukan :</div>
                                    <div class="text-sm text-gray-500 whitespace-pre">Pengeluaran : Rp.{pengeluaran[i] === 0 ? '0           .' : pengeluaran[i]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    })}
                    
                    {/* <a  className="bg-white p-4 rounded-xl border border-gray-50 cursor-pointer">
                        <div className='flex sm:flex-wrap md:justify-between gap-4'>
                            <div class="flex justify-between space-x-3 sm:space-x-1 items-center">
                                <img class="w-10 h-10 rounded-full " src={require('../assets/png/favicon.png')} alt="foto" />
                                <div class="space-y-0.5 font-sm text-gray-500 flex flex-col justify-start">
                                    <div className=" uppercase text-sm text-left ">Nama Mitra</div>
                                    <div class="text-sm text-gray-500 ">email@email.com....</div>
                                </div>
                            </div>
                            <div class="flex justify-between space-x-3 sm:space-x-1 items-center">
                                <img class="w-10 h-10 rounded-full " src={require('../assets/png/account-multiple-outline.png')} alt="foto" />
                                    <div className=" text-sm text-left ">3 User</div>
                            </div>
                            <div class="flex justify-between space-x-3 sm:space-x-1 items-center">
                                <img class="w-10 h-10 rounded-full " src={require('../assets/png/book-information-variant.png')} alt="foto" />
                                <div class="space-y-0.5 font-sm text-gray-500 flex flex-col justify-start">
                                    <div className=" text-sm text-left ">Peminjaman :</div>
                                    <div class="text-sm text-gray-500 ">Pembayaran :</div>
                                </div>
                            </div>
                            <div class="flex justify-between space-x-3 sm:space-x-1 items-center">
                                <img class="w-10 h-10 rounded-full " src={require('../assets/png/currency-usd.png')} alt="foto" />
                                <div class="space-y-0.5 font-sm text-gray-500 flex flex-col justify-start">
                                    <div className=" text-sm text-left ">Pemasukan :</div>
                                    <div class="text-sm text-gray-500 ">Pengeluaran :</div>
                                </div>
                            </div>
                        </div>
                    </a> */}
                    
            </div>
            </div>
            <Footer />
        </div>
        }
        </div>
        
        
    )
}

export default Mitra