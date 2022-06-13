import React from 'react';

const Footer = () => {

    return (
        <div className ="bg-primary mt-8">
            <footer className="container mx-w-6xl  mx-auto py-4  dark:bg-primary w-full ">
                <div className="sm:flex sm:items-center sm:justify-between mb-4">
                    <a href="/" className="flex items-center mb-4 sm:mb-0">
                    <img
                        src={require('../assets/png/logo.png')}
                        className="mr-3 h-8"
                        alt="logo"
                    />
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 dark:text-white">
                    <li>
                        <a href="https://kasbaik.kitabisa.com" className="hover:text-gray-400 font-sans">
                        About
                        </a>
                    </li>
                    </ul>
                </div>
        <hr className="my-0.5 border-white sm:mx-auto dark:border-white lg:my-4" />
        <span className="block pt-3 text-sm text-white sm:text-center dark:text-white font-sans">
            © 2022{" "}
            <a href="https://kitabisa.com" className="hover:underline font-sans">
            Kitabisa
            </a>
            . Made by <a href='https://instagram.com/bagusnurhuda' className='hover:text-gray-400 font-sans' target='_blank'>Bagus Nurhuda</a>
        </span>
            </footer>
        </div>

        


    )
}

export default Footer;