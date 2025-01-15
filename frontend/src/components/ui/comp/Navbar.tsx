// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { AuthModal } from './AuthModal';
// import { Link } from 'react-scroll';

// export const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };

//     return (
//         <nav className="bg-zinc-900 text-white py-4 px-8 flex justify-between items-center shadow-lg fixed top-0 left-0 right-0 z-20 transition-all ease-in-out duration-300">
//             {/* Logo and Brand Name */}
//             <div className="flex items-center space-x-2 cursor-pointer">
//                 {/* Insert your logo here */}
//                 <img src="/path-to-your-logo.png" alt="Carpool Logo" className="w-8 h-8" />
//                 <h1 className="text-2xl font-semibold tracking-wide text-white">Carpool</h1>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-8 items-center">
//                 <Link
//                     to="home"
//                     smooth={true}
//                     duration={500}
//                     className="cursor-pointer text-lg font-medium relative group"
//                 >
//                     Home
//                     <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
//                 </Link>
//                 <Link
//                     to="about"
//                     smooth={true}
//                     duration={500}
//                     className="cursor-pointer text-lg font-medium relative group"
//                 >
//                     About
//                     <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
//                 </Link>
//                 <Link
//                     to="contact"
//                     smooth={true}
//                     duration={500}
//                     className="cursor-pointer text-lg font-medium relative group"
//                 >
//                     Contact
//                     <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
//                 </Link>
                
//                 {/* Auth or Logout Button */}
//                 <div>
//                     {isLoggedIn ? (
//                         <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 transition-all duration-200 text-white px-4 py-2 rounded-md">Logout</Button>
//                     ) : (
//                         <AuthModal />
//                     )}
//                 </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//                 <button onClick={() => setIsOpen(!isOpen)} className="text-white">
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//                     </svg>
//                 </button>
//             </div>

//             {/* Mobile Menu */}
//             {isOpen && (
//                 <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-900 text-white flex flex-col items-center space-y-4 py-4 transition-transform transform duration-300 ease-in-out">
//                     <Link to="home" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500 transition-all duration-200" onClick={() => setIsOpen(false)}>Home</Link>
//                     <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500 transition-all duration-200" onClick={() => setIsOpen(false)}>About</Link>
//                     <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500 transition-all duration-200" onClick={() => setIsOpen(false)}>Contact</Link>
                    
//                     {/* Auth or Logout Button */}
//                     <div className="mt-4">
//                         {isLoggedIn ? (
//                             <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 transition-all duration-200 text-white w-full py-2 rounded-md">Logout</Button>
//                         ) : (
//                             <AuthModal />
//                         )}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';
import { Link } from 'react-scroll';
import { FaUserCircle } from 'react-icons/fa';
import logo from '@/assets/rs-logo.png';
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const name1 = localStorage.getItem('name');
        if (token) {
            setIsLoggedIn(true);
            setUser({ name: name1 || 'user' }); // You can replace with user data from your API
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <nav className="bg-zinc-900 text-white py-4 px-8 flex justify-between items-center shadow-lg fixed top-0 left-0 right-0 z-20 transition-all ease-in-out duration-300">
            {/* Logo and Brand Name */}
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-all duration-300">
                {/* Insert your logo here */}
                <img src={logo} alt="Carpool Logo" className="w-8 h-8 rounded-2xl" />
                <h1 className="text-2xl font-semibold tracking-wide text-white">RouteSync</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
                <Link
                    to="home"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-lg font-medium relative group hover:text-blue-500"
                >
                    Home
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
                </Link>
                <Link
                    to="about"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-lg font-medium relative group hover:text-blue-500"
                >
                    About
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
                </Link>
                <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-lg font-medium relative group hover:text-blue-500"
                >
                    Contact
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
                </Link>

                {/* Auth or Logout Button */}
                <div>
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-2">
                            <FaUserCircle className="text-2xl text-white" />
                            <span className="text-white font-medium">{user?.name}</span>
                            <Button 
                                onClick={handleLogout} 
                                className="bg-red-600 hover:bg-red-700 transition-all duration-200 text-white px-4 py-2 rounded-md"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <AuthModal />
                    )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-900 text-white flex flex-col items-center space-y-4 py-4 transition-transform transform duration-300 ease-in-out">
                    <Link to="home" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500 transition-all duration-200" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500 transition-all duration-200" onClick={() => setIsOpen(false)}>About</Link>
                    <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500 transition-all duration-200" onClick={() => setIsOpen(false)}>Contact</Link>

                    {/* Auth or Logout Button */}
                    <div className="mt-4">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-2">
                                <FaUserCircle className="text-2xl text-white" />
                                <span className="text-white font-medium">{user?.name}</span>
                                <Button 
                                    onClick={handleLogout} 
                                    className="bg-red-600 hover:bg-red-700 transition-all duration-200 text-white w-full py-2 rounded-md"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <AuthModal />
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
