import logo from "../assets/OIP__1_-removebg-preview.png";
import { NavLink } from "react-router-dom";
import hamIcon from "../assets/ham.svg";
import exitIcon from "../assets/x.svg";
import { useState } from "react";
import { auth } from "../firebase";
import ProfileIcon from '../assets/profile.svg';

export default function Navbar() {
  const user = auth.currentUser;
  const [click, setClick] = useState(false);

  function handleClick() {
    setClick(!click);
  }
  let cssClass = "";
  if (click) {
    cssClass =
      "absolute flex flex-col gap-3 items-center w-full top-[60px] p-5 bg-white right-0 glass";
  } else {
    cssClass = "nav-links sm:flex gap-5 items-center hidden";
  }
  return (
    <nav className="flex justify-between p-5">
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
        <NavLink className="font-semibold lato">Home</NavLink>
        <NavLink className="font-semibold lato">Counter</NavLink>
        <NavLink className="font-semibold lato">Favourites</NavLink>
        <NavLink className="font-semibold lato">History</NavLink>
        {user ? (
          <p className="font-semibold lato flex items-center gap-1"><img src={ProfileIcon} alt="" />{`${user.displayName}`}</p>
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
