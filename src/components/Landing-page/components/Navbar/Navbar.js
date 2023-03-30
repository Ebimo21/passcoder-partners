import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css"
import Svg from "./Vector.svg"
import {useNavigate} from 'react-router-dom'

function Navbar() {

	let navigate = useNavigate()
	
    
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>

      {/* logo in svg */}
      <div>
        <img src={Svg} alt="logo" style={{color:"#292482"}} />
			  <h3 className="h3-for-navbar">Passcoder</h3>
      </div>
			<nav className="nav-bar" ref={navRef}>
			  <Link to="/">About Us</Link>
				<Link to ="/Portfolio">Our Service</Link>
        <div className="div-navbar-signup-button">

			<Link to= "/">
				<button onClick={(e)=>{navigate('/')}}
				className="navbar-signup-button">
					Sign Up
				</button>
			</Link>

           
        </div>
				<button
            className="nav-btn nav-close-btn"
					  onClick={showNavbar}>
					  <FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
      <button 
	  onClick={(e)=>{navigate('/')}}
	  className="navbar-signup-button-close">Sign Up
      </button>
		</header>
	);
}

export default Navbar;