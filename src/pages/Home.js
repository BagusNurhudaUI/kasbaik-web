import axios from 'axios';
import React, {useState, useHistory, useEffect} from 'react';
import {Navigate, Route, useNavigate,} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading.js';
import { Pie ,Polar, PolarArea } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import { Chart as ChartJS} from "chart.js/auto";
import Footer from '../components/Footer';
import NotAuth from '../components/NotAuth';
import client from '../config.js'

Chart.register(ArcElement);

export default function Home (){
    const [jwt, setjwt] = useState('');
    const [isAuth, setisAuth] = useState(true);
    const [cookies, setCookie] = useCookies('');
    const [user, setUser] = useState({});
    const [totaluser, setTotaluser] = useState(0)
    const [totalmitra, setTotalmitra] = useState(0)
    const [peminjaman, setPeminjaman] = useState(0)
    const [totalpayment, setTotalpaymnet] = useState(0)
    const [payment, setPayment] = useState({})
    const [infoData, setInfoData] = useState([])
    const navigate = useNavigate()
    
    const userData = {
        labels: ['Pending', 'Rejected', 'Accepted',
        'Payment', 'Done'],
        datasets: [
          {
            label: "Status Peminjaman",
            data: [infoData.pen, infoData.rej, infoData.acc, infoData.pay, infoData.done],
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
            
            await client.get(`/home`, {
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
            await client.get('/jumlahtotal', {
                headers :
                    {      
                        "authorization": token,      
                    }  
            })
            .then((response) =>{
                let acc =0, rej=0 , pen=0 , pay =0, done = 0 ;
                console.log(response.data);
                setTotaluser(response.data.totaluser.length)
                setTotalmitra(response.data.totalmitra.length)
                setPeminjaman(response.data.totalborrower.length)
                setTotalpaymnet(response.data.totalpayment)
                setPayment(response.data.payment)
                response.data.totalborrower.map(p => {
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
            console.log(infoData);
        } catch (error) {
            console.log(error);
        }
    }

    const goToPembayaranDetail = (id_payment) => {
        navigate(`/pembayaran/${id_payment}`)
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
            <Loading loading={loading} />
             : 
            isAuth ? 
            <div className="bg-gray-100 h-full">
            <Navbar id_user={user.id_user}/>
            <main className="container mx-w-6xl  mx-auto py-4 h-full min-h-screen ">
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
                            <h2 className="text-gray-800 font-bold tracking-wider ">
                            {user.username ? user.username : <p className="text-italic">not logged</p> }
                            </h2>
                            <div className="flex items-center gap-4">
                            <p className="text-lg text-gray-600 tracking-wider">
                            </p>
                            </div>
                        </div>
                        <h2 className="md:text-lg sm:text-md xl:text-3xl text-gray-700 font-black tracking-wider sm:text-sm">
                            <span className="md:text-lg sm:text-md ">Rp.</span>
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
                            href="/home"
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
                    <a href='/user' className="bg-white p-6 rounded-xl border border-gray-50 cursor-pointer">
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
                    </a>
                    <a href='/mitra' className="bg-white p-6 rounded-xl border border-gray-50 ">
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
                    </a>
                    <a href='/peminjaman' className="bg-white p-6 rounded-xl border border-gray-50">
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
                    </a>
                    <a href='/pembayaran' className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                        <p className="text-xs text-gray-600 tracking-wide">
                            Pembayaran
                        </p>
                        <h3 className="mt-2 text-lg text-emerald-800 font-bold">
                            Rp.{totalpayment.toLocaleString("id-ID")}
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
                        href="/pembayaran"
                        className="px-4 py-2 text-xs bg-yellow-500 text-white rounded uppercase tracking-wider font-semibold hover:bg-yellow-400"
                        >
                        More
                        </a>
                    </div>
                    <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                        
                        {payment[0] === undefined ? <div></div> :
                        payment.map((pay ,i) => {
                            if(i >= 6){
                            return;
                            }
                            return (
                             <li className="py-3 my-2 flex justify-between text-sm text-gray-500 font-semibold cursor-pointer" onClick={()=> {goToPembayaranDetail(pay.id_payment)}}>
                             <p className="px-3 font-semibold flex text-xs items-center">{pay.createdAt.split(".")[0].replace('T', ' ')}</p>
                             <p className="px-3 text-gray-600 flex items-center">{pay.user}</p>
                             <p className="px-3 tracking-wider flex items-center">{pay.payment_method}</p>
                             <p className="px-3 text-emerald-800 flex items-center">{pay.mitra.partner_name}</p>
                             <p className="md:text-base text-gray-800 flex items-center gap-2">
                                 Rp.{pay.amount_payment.toLocaleString("id-ID")}
                             </p>
                             </li>
                            )
                        })}
                           
                    </ul>
                    </div>
                </div>
                {/* End Third Row */}
                </div>
            </main>
            
            {/* <div className='h-screen'></div> */}
            <Footer />
            </div>
            
            : 
                <NotAuth />
            }
        
        </div>
       
        
        
    )
}