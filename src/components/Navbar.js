import React , {useState, useRef} from 'react'
import axios from 'axios';
import { useNavigate, useHistory } from 'react-router-dom';
import { Transition } from "@headlessui/react";



const Navbar = (props) => {


    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    
    const Logout = async (id_user) => {
        console.log('clicked');
        // localStorage.setItem("token2", null)
        const token = localStorage.getItem("token2");
        
        console.log(token);
        try {
            console.log('masuk kesini');
            await axios.get('http://localhost:8080/logout', {
                headers :
                {      
                    "authorization": token,      
                }  
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem("token2", null)
                window.alert(response.data)
                navigate("/");
            })
            
        } catch (error) {
            console.log(error.response);
        }
    }
 
    return (

<header className="header relative z-10"> 
    
      <nav className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a className="flex-shrink-0 cursor-pointer" href="/" >
                <img
                  className="h-8 w-30"
                  src={require('../assets/png/logo.png')}
                  alt="Workflow"
                  
                />
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/home"
                    className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>

                  <a
                    href="/user"
                    className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    User
                  </a>

                  <a
                    href="/mitra"
                    className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Mitra
                  </a>

                  <a
                    href="/peminjaman"
                    className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Peminjaman
                  </a>
                  <a
                    href="/pembayaran"
                    className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Pembayaran
                  </a>
                  <a
                    onClick={() => {Logout(props.id_user)}}
                    className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium inset-y-0 right-0 cursor-pointer"
                    
                  >
                    Logout
                  </a>
                  
                </div>    
              </div>
              
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white    "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="/home"
                  className=" text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="/user"
                  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  User
                </a>

                <a
                  href="/mitra"
                  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Mitra
                </a>

                <a
                  href="/peminjaman"
                  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Peminjaman
                </a>
                <a
                  href="/pembayaran"
                  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Pembayaran
                </a>
                <a
                  onClick={Logout}
                  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
      
    </header>

    
    )
}
 
export default Navbar