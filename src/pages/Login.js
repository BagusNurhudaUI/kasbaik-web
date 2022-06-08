import React, {useState, useHistory} from 'react';
import {useNavigate, Route, Link} from 'react-router-dom'
import axios from 'axios';
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
                // console.log(cookies);
                const token = response.data.tokenweb
                localStorage.setItem('token2', token);
                
                navigate("/home")
            })
            .catch((error) =>{
              console.log(error);
            })
        } catch (error) {
            <Route exact path="/login" element={<Login/>}/>
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
        
    }

    return (
      
        <section className="h-screen">
  <div className="container px-6 py-12 h-full">
    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img
          src={require('../assets/png/login.jpg')}
          className="w-full"
          alt="Phone image"
        />
      </div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        <form onSubmit={login}>
          {/* Email input */}
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password input */}
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck3"
                defaultChecked=""
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
            <a
              href="#!"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
            >
              Forgot password?
            </a>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            
          >
            Sign in
          </button>
          
        </form>
      </div>
    </div>
  </div>
</section>

      
    )
}

export default Login;