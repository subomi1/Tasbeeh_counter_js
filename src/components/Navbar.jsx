import logo from "../assets/OIP__1_-removebg-preview.png";
import { NavLink } from "react-router-dom";
import hamIcon from "../assets/ham.svg";
import exitIcon from "../assets/x.svg";
import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import ProfileIcon from "../assets/profile.svg";
import { useAuth } from "../store/AuthContext";
import { toast } from 'react-hot-toast';

export default function Navbar() {
  //   const user = auth.currentUser;
  const [click, setClick] = useState(false);
  const { user, loading } = useAuth();

  function handleClick() {
    setClick(!click);
  }
  let cssClass = "";
  let flexClass = '';
  if (click) {
    cssClass =
      "absolute flex flex-col gap-3 items-center w-full top-[60px] p-5 bg-white right-0 glass z-50";
    flexClass = 'flex flex-col gap-3';
  } else {
    cssClass = "nav-links sm:flex gap-5 items-center hidden";
    flexClass = 'flex gap-5'
  }
  function handleLogout() {
    signOut(auth)
      .then(() => {
        toast.success("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }
  return (
    <nav className="flex justify-between p-5 z-50" id="hero">
      <div className="logo flex items-center gap-1">
        <img src={logo} alt="Logo" className="w-8" />
        <h1 className="lato font-bold">Tasbeeh Counter</h1>
      </div>
      {click ? (
        <img
          src={exitIcon}
          alt=""
          onClick={handleClick}
          className="w-7 sm:hidden"
        />
      ) : (
        <img
          src={hamIcon}
          alt=""
          onClick={handleClick}
          className="w-7 sm:hidden"
        />
      )}
      <div className={cssClass}>
        <NavLink className="font-semibold lato" to='/' onClick={() => setClick(false)}>Home</NavLink>
        <NavLink className="font-semibold lato" to="/categories" onClick={() => setClick(false)}>
          Categories
        </NavLink>
        <NavLink className="font-semibold lato" to="/favourite" onClick={() => setClick(false)}>Favourites</NavLink>
        <NavLink className="font-semibold lato" to="/history" onClick={() => setClick(false)}>History</NavLink>
        {user ? (
          <div className={flexClass}>
            <p className="font-semibold lato flex items-center gap-1">
              <img src={ProfileIcon} alt="" />
              {`${user.displayName}`}
            </p>
            <NavLink
              to="/"
              className="bg-[#14b766] px-4 py-2 rounded-md text-white flex text-center font-semibold lato"
              onClick={() => handleLogout()}
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="bg-[#14b766] px-4 py-2 rounded-md text-white flex text-center font-semibold lato"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
