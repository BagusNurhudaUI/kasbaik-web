import axios from 'axios';
import React, {useState, useHistory, useEffect} from 'react';
import {Navigate, Route, useNavigate,} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Navbar from '../components/Navbar';
import ClipLoader from "react-spinners/ClipLoader";
import { Pie ,Polar, PolarArea } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import { Chart as ChartJS} from "chart.js/auto";
Chart.register(ArcElement);


export default function Home (){
    const [jwt, setjwt] = useState('');
    const [isAuth, setisAuth] = useState(true);
    const [cookies, setCookie] = useCookies('');
    const [user, setUser] = useState({});
    const [datahome, setDatahome] = useState();
    const [totaluser, setTotaluser] = useState(0)
    const [totalmitra, setTotalmitra] = useState(0)
    const [peminjaman, setPeminjaman] = useState(0)
    const [totalpayment, setTotalpaymnet] = useState(0)
    const [payment, setPayment] = useState({})
    const navigate = useNavigate()
    
    
    const userData = {
        labels: ['Pending', 'Rejected', 'Accepted',
        'Payment', 'Done'],
        datasets: [
          {
            label: "Status Peminjaman",
            data: [65, 59, 80, 81, 56],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      }

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
                console.log(response.data);
                setUser(response.data.user)
                setisAuth(true)
            })
            
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            }
        }  
    }

    const GetInfoTotal = async(e) => {
        const token = localStorage.getItem("token2") || "";
        try {
            await axios.get('http://localhost:8080/jumlahtotal', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) =>{
                setTotaluser(response.data.totaluser.length)
                setTotalmitra(response.data.totalmitra.length)
                setPeminjaman(response.data.totalborrower.length)
                setTotalpaymnet(response.data.totalpayment)
                setPayment(response.data.payment)
                console.log(payment[0]===undefined);
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const notAuth = () => {
        console.log('clicked');
        navigate("/")
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

    useEffect(() => {
        GetInfoTotal()
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
            <div className="bg-gray-100">
            <Navbar id_user={user.id_user}/>
            
            <div>Halo, Selamat datang {user.username} !</div>
            <button onClick={GetInfoTotal}>Click</button>

            <>
            <main className="container mx-w-6xl  mx-auto py-4 ">
                <div className="flex flex-col space-y-8">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                    <div className="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
                    <div className="flex flex-col space-y-6 md:h-full md:justify-between">
                        <div className="flex justify-between">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Informasi Akun
                        </span>
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                            Total Pendanaan
                        </span>
                        </div>
                        <div className="flex gap-2 md:gap-4 justify-between items-center">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-gray-800 font-bold tracking-widest leading-tight">
                            {user.username ? user.username : <p className="text-italic">not logged</p> }
                            </h2>
                            <div className="flex items-center gap-4">
                            <p className="text-lg text-gray-600 tracking-wider">
                            </p>
                            </div>
                        </div>
                        <h2 className="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider sm:text-sm">
                            <span className="md:text-xl ">Rp</span>
                            305.683.237
                        </h2>
                        </div>
                        <div className="flex gap-2 md:gap-4">
                        <a
                            href="#"
                            className="bg-yellow-500 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-yellow-400"
                        >
                            Lihat Akun
                        </a>
                        <a
                            onClick={GetInfo}
                            className="bg-yellow-50 px-5 py-3 w-full text-center md:w-auto rounded-lg text-yellow-600 text-xs tracking-wider font-semibold hover:bg-yellow-500 hover:text-white cursor-pointer"
                        >
                            Refresh
                        </a>
                        </div>
                    </div>
                    </div>
                    <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-900 flex flex-col justify-between">
                    <div className="flex flex-col">
                        <p className="text-white font-bold">Selamat datang {user.username} ! </p>
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
                    <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                        <p className="text-xs text-gray-600 tracking-wide">
                           Pengguna
                        </p>
                        <h3 className="mt-2 text-lg text-emerald-800 font-bold">{totaluser}</h3>
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
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                        <p className="text-xs text-gray-600 tracking-wide">Mitra &amp; Partner</p>
                        <h3 className="mt-2 text-lg text-emerald-800 font-bold">{totalmitra}</h3>
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
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                        <p className="text-xs text-gray-600 tracking-wide">Peminjaman</p>
                        <h3 className="mt-2 text-lg text-emerald-800 font-bold">
                            {peminjaman}
                        </h3>
                        <span className="mt-2 text-xs text-gray-600">
                        Update terakhir 1 menit yang lalu
                        </span>
                        </div>
                        <div className="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <img
                            src={require('../assets/png/clipboard-edit.png')}
                            alt="icon"
                            className="w-auto h-10 md:h-6 xl:h-8 object-cover"
                        />
                        </div>
                    </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                        <p className="text-xs text-gray-600 tracking-wide">
                            Pembayaran
                        </p>
                        <h3 className="mt-2 text-lg text-emerald-800 font-bold">
                            Rp.{totalpayment}
                        </h3>
                        <span className="mt-2 text-xs text-gray-500">
                        Update terakhir 1 menit yang lalu
                        </span>
                        </div>
                        <div className="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <img
                            src={require('../assets/png/cash-100.png')}
                            alt="icon"
                            className="w-auto h-10 md:h-6 xl:h-8 object-cover"
                        />
                        </div>
                    </div>
                    </div>
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
                    <PolarArea data={userData}
                    />
                    </div>
                    <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-gray-600 font-bold tracking-wide">
                        Riwayat Pembayaran Terakhir
                        </h2>
                        <a
                        href="#"
                        className="px-4 py-2 text-xs bg-blue-100 text-blue-500 rounded uppercase tracking-wider font-semibold hover:bg-blue-300"
                        >
                        More
                        </a>
                    </div>
                    <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                        
                        {payment[0] === undefined ? <div></div> :
                        payment.map((pay ,i) => {
                            if(i >= 5){
                            return;
                            }
                            return (
                             <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                             <p className="px-4 font-semibold flex items-center">{pay.createdAt}</p>
                             <p className="px-4 text-gray-600 flex items-center">{pay.nama_lengkap}</p>
                             <p className="px-4 tracking-wider flex items-center">{pay.payment_method}</p>
                             <p className="px-4 text-emerald-800 flex items-center">{pay.partner_name}</p>
                             <p className="md:text-base text-gray-800 flex items-center gap-2">
                                 Rp.{pay.amount_payment}
                             </p>
                             </li>
                            )
                        })}
                           
                        {/* <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                        <p className="px-4 font-semibold">Today</p>
                        <p className="px-4 text-gray-600">McDonald</p>
                        <p className="px-4 tracking-wider">Cash</p>
                        <p className="px-4 text-blue-600">Food</p>
                        <p className="md:text-base text-gray-800 flex items-center gap-2">
                            16.90
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                        <p className="px-4 font-semibold">Today</p>
                        <p className="px-4 text-gray-600">McDonald</p>
                        <p className="px-4 tracking-wider">Cash</p>
                        <p className="px-4 text-blue-600">Food</p>
                        <p className="md:text-base text-gray-800 flex items-center gap-2">
                            16.90
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                        <p className="px-4 font-semibold">Today</p>
                        <p className="px-4 text-gray-600">McDonald</p>
                        <p className="px-4 tracking-wider">Cash</p>
                        <p className="px-4 text-blue-600">Food</p>
                        <p className="md:text-base text-gray-800 flex items-center gap-2">
                            16.90
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                        <p className="px-4 font-semibold">Today</p>
                        <p className="px-4 text-gray-600">McDonald</p>
                        <p className="px-4 tracking-wider">Cash</p>
                        <p className="px-4 text-blue-600">Food</p>
                        <p className="md:text-base text-gray-800 flex items-center gap-2">
                            16.90
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                        <p className="px-4 font-semibold">Today</p>
                        <p className="px-4 text-gray-600">McDonald</p>
                        <p className="px-4 tracking-wider">Cash</p>
                        <p className="px-4 text-blue-600">Food</p>
                        <p className="md:text-base text-gray-800 flex items-center gap-2">
                            16.90
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                        <p className="px-4 font-semibold">Today</p>
                        <p className="px-4 text-gray-600">McDonald</p>
                        <p className="px-4 tracking-wider">Cash</p>
                        <p className="px-4 text-blue-600">Food</p>
                        <p className="md:text-base text-gray-800 flex items-center gap-2">
                            16.90
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </p>
                        </li> */}
                    </ul>
                    </div>
                </div>
                {/* End Third Row */}
                </div>
            </main>
            </>

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