import './Navbar.css'
import logo from '../assets/images/logo.jpg'

const Navbar = () => {

  return (
    <div className="navbar md:px-24 px-10 top-0 left-0 w-full
     text-black font-bold">{/* border-4 border-indigo-600 */}

      <div className="navbar-start">

        <img src={logo} alt="Brand Logo" className="h-20 w-auto mr-2" />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          <li className='text-xl'><a>Home</a></li>
          <li className='text-xl'><a>Business Solutions</a></li>
          <li className='text-xl'><a>Find Jobs</a></li>
        </ul>
      </div>

      <div className="navbar-end  ">
        <button className="text-white bg-purple-700 border-white 
            border-4 rounded-full xxs:text-xs xs:text-xl">
          Contact US</button>       
      </div>
      <div className='navbar-dropdown '>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow 
          bg-base-100 rounded-box w-52">
              <li><a className='text-black'>Home</a></li>
              <li><a className='text-black'>Business Solutions</a></li>
              <li><a className='text-black'>Find Jobs</a></li>
            </ul>
          </div>
        </div>

    </div>
  );
}
export default Navbar;
