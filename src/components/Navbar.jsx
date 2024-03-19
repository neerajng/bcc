import { useState } from 'react';
import './Navbar.css'
import logo from '../assets/images/logo.jpg'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
  return (
    <div className="navbar sticky z-50 md:px-24 px-10 top-0 left-0 w-full shadow-bottom
     text-black font-bold">{/* border-4 border-indigo-600 */}

      <div className="navbar-start">

        <img src={logo} alt="Brand Logo" className="h-20 w-auto mr-2" />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          <li className='text-xl'><a href="#home">Home</a></li>
          <li className='text-xl'><a href="#business">Business Solutions</a></li>
          <li className='text-xl'><a href="#findjobs">Find Jobs</a></li>
          <li className='text-xl'><a href="#contactus">Contact Us</a></li>
        </ul>
      </div>

      <div className="navbar-end  bg-purple-700" >
        {/* <button className="text-white bg-purple-700 border-white 
            border-4 rounded-full xxs:text-xs xs:text-xl">
          Contact US</button>        */}
      </div>
      <div className='navbar-dropdown '>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
            </div>
            {isOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow 
                                        bg-base-100 rounded-box w-52">
              <li><a className='text-black' href="#home">Home</a></li>
              <li><a className='text-black' href="#business">Business Solutions</a></li>
              <li><a className='text-black' href="#findjobs">Find Jobs</a></li>
              <li><a className='text-black' href="#contactus">Contact Us</a></li>
            </ul>
            )}
          </div>
        </div>
      

    </div>
  );
}
export default Navbar;
