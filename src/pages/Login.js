import React, {useState, useHistory} from 'react';
import {useNavigate, Route, Link} from 'react-router-dom'
import axios from 'axios';
import Navbar from '../components/Navbar'
import Home from './Home'
import { useCookies } from 'react-cookie';
import client from '../config.js'
// const API_URL = 'http://localhost:8080'
const  Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMsg] = useState('');
    const [token, setToken] = useState('');
    // const history = useHistory();
    const [cookies, setCookie] = useCookies('');
    const navigate = useNavigate();

    
    const login = async(e) => {
        e.preventDefault();
        try {
            console.log('ini console log sebelum fetch api');
            await client.post(`/login`, {
                email: email,
                password: password,
            })
            .then((response) =>{
                console.log( response.data);
                const token = response.data.tokenweb
                localStorage.setItem('token2', token);
                console.log('sebelum navigate');
                navigate("/home")
                console.log('setelah navigate');
            })
            
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Network Error'){
              setMsg('Backend Error: Cannot load to database!')
            }
            if( error.response){
              setMsg(error.response.data.message );
            }
             
        }
        
    }
    
    
    return (
      
      <>
          <Navbar />
          <section className="flex flex-col md:flex-row h-screen items-center">
            {/* <div className="bg-blue-600  lg:block w-full md:w-1/2 xl:w-2/3 h-screen bg-white w-full md:max-w-md max1:hidden lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen  
              flex items-center justify-cente">
              <img src={require('../assets/png/login.jpg')} alt="" className="w-full h-full object-cover" />
            </div> */}
            <div
              className="bg-white w-full h-4/5 mt-5 mt-5
              flex items-center justify-center mx-auto text-center justify-center"
            >
              <div className="xl:w-1/5 md:w-1/3 sm:w-2/3 2xl:w-10 h-90">
                <img src={require('../assets/png/logo1.png')} alt="logo kasbaik" className="w-full md:w-full mx-auto px-5"/>
                <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                  Log in to your account
                </h1>
                <form className="mt-6" onSubmit={login}>
                  <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="email"
                      
                      placeholder="Enter Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autofocus=""
                      autoComplete=""
                      required=""
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="justify-start text-gray-700">Password</label>
                    <input
                      type="password"
                      
                      placeholder="Enter Password"
                      minLength={6}
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                      focus:bg-white focus:outline-none"
                      required=""
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-right mt-2">
                    <a
                      href="#"
                      className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full block bg-primary hover:bg-yellow-500 focus:bg-primary text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                  >
                    Log In
                  </button>
                </form>
                <hr className="my-6 border-gray-300 w-full" />
                {message ? <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                  <span class="font-medium">Something Wrong!</span> {message}
                </div> : null}
                

                <p className="text-sm text-gray-500 mt-12">
                  © 2022 Kasbaik - All Rights Reserved.
                </p>
              </div>
            </div>
          </section>
      </>
      


      

    //     <section>
    //        <div class="relative flex flex-col justify-center min-h-screen  overflow-hidden">
    //   <div class="w-3/5 p-6 m-auto bg-primary border-t-4 border-white rounded-3xl shadow-md border-top lg:md:max-w-lg">
    //     <div class=" flex justify-center">
    //         <img
    //           className="h-8 w-30"
    //           src={require('../assets/png/logo.png')}
    //           alt="Image Login"
    //         />
    //     </div>
    //     <form class="mt-6" onSubmit={login} >
    //       <div>
    //         <label for="email" class="justify-start text-sm text-white">Email</label> 
    //         <input type="email"
    //           class="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md   focus:outline-none focus:ring focus:ring-opacity-40" 
    //           placeholder="Email address"
    //           value={email} onChange={(e) => setEmail(e.target.value)}
    //           />
    //       </div>
    //       <div class="mt-4">
    //         <div>
    //           <label for="password" class="block text-sm text-white">Password</label>
    //           <input type="password"
    //             class="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md  focus:outline-none focus:ring focus:ring-opacity-40" 
    //             placeholder="Password"
    //             value={password} onChange={(e) => setPassword(e.target.value)}
    //             />
    //         </div>
    //         <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a>
    //         <div class="mt-6">
    //           <button
    //             class="w-full px-4 py-2 tracking-wide text-primary transition-colors duration-200 transform bg-white rounded-md " >
    //             Login
    //           </button>
    //         </div>
    //         </div>
    //     </form>
    //     <p class="mt-8 text-xs font-light text-center text-white">{message}</p>
    //   </div>
    // </div>
    //     </section>
      
      
      
    )
}

export default Login;