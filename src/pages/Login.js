import React, {useState, useHistory} from 'react';
import {useNavigate, Route, Link} from 'react-router-dom'
import axios from 'axios';
import Navbar from '../components/Navbar'
import Home from './Home'
import { useCookies } from 'react-cookie';

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
        console.log(email, password);
        try {
            await axios.post('http://localhost:8080/login', {
                email: email,
                password: password,
            })
            .then((response) =>{
                // if ( response.data.user.role !== 'admin') {
                //   setMsg("Anda bukan admin dari kasbaik")
                //   throw message
                // }
                const token = response.data.tokenweb
                localStorage.setItem('token2', token);
                navigate("/home")
            })
            
        } catch (error) {
            console.log(error);
            if( error.response){
              setMsg(error.response.data.message );
            }
             
        }
        
    }

    return (
      <>
      <>
        <section class=" gradient-form bg-white md:h-fit">
          <Navbar />
          <div class="flex justify-center items-center text-gray-800 min-h-screen pt-5">
                <div class="sm:flex block bg-white rounded-lg justify-center max-w-max max-h-max ">
                    <div class="md:px-20 lg:px30  sm:w-1/2 px-4 mx-auto ">
                      <div class="text-center">
                        <img
                          class="mx-auto max-w-60"
                          src={require('../assets/png/logo.png')}
                          alt="logo"
                        />
                        <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Welcome to Admin Page</h4>
                      </div>
                      <form onSubmit={login}>
                        <p class="mb-4">Please login to your account</p>
                        <div class="mb-4 max-w-80">
                          <input
                            type="email"
                            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Username"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            
                          />
                        </div>
                        <div class="mb-4 max-w-10">
                          <input
                            type="password"
                            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            
                          />
                        </div>
                        <div class="text-center pt-1 mb-12 pb-1 max-w-10">
                          <button
                            class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-900 to-green-900"
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={login}
                            
                          >
                            Log in
                          </button>
                          <a class="text-gray-500" href="#!">Forgot password?</a>
                          </div>
                         
                      </form>
                      {message !== '' ? 
                        <div class="flex items-center justify-center pb-6">
                          <p class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >{message}</p>
                        </div>
                        : 
                        <div></div>
                        }
                    </div>
                  
                    <div
                    class="sm:w-1/2 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-r from-green-900 to-green-900 mx-10"
                    
                    // style="
                    //   background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
                    // "
                  >
                    <div class="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 class="text-xl font-semibold mb-6">We are more than just a company</h4>
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                      </p>
                    </div>
                  </div>
                </div>
              
              
          </div>
      
        </section>
      </>
      




        <section>
           <div class="relative flex flex-col justify-center min-h-screen  overflow-hidden">
      <div class="w-3/5 p-6 m-auto bg-primary border-t-4 border-white rounded-3xl shadow-md border-top lg:md:max-w-lg">
        <div class=" flex justify-center">
            <img
              className="h-8 w-30"
              src={require('../assets/png/logo.png')}
              alt="Image Login"
            />
        </div>
        <form class="mt-6" onSubmit={login} >
          <div>
            {/* <label for="email" class="justify-start text-sm text-white">Email</label> */}
            <input type="email"
              class="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md   focus:outline-none focus:ring focus:ring-opacity-40" 
              placeholder="Email address"
              value={email} onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div class="mt-4">
            <div>
              <label for="password" class="block text-sm text-white">Password</label>
              <input type="password"
                class="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md  focus:outline-none focus:ring focus:ring-opacity-40" 
                placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a>
            <div class="mt-6">
              <button
                class="w-full px-4 py-2 tracking-wide text-primary transition-colors duration-200 transform bg-white rounded-md " >
                Login
              </button>
            </div>
            </div>
        </form>
        <p class="mt-8 text-xs font-light text-center text-white">{message}</p>
      </div>
    </div>
        </section>
      
      </>
      
    )
}

export default Login;