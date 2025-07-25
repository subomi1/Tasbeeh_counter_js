import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Register() {
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { email, password, confirmPassword, username } = data;
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password, username)
      .then(userCredentials => {
        const user = userCredentials.user;
        return updateProfile(user,{
          displayName: username,
        })
      })
      .catch(error => {
        alert(error.message)
      })
  }
  return (
    <section className="w-full min-h-screen flex justify-center items-center px-4">
      <div className=" w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center max-w-[500px] w-full py-10"
        >
          <h2 className="mb-10 lato font-bold text-xl lg:text-3xl">
            Create Your Account
          </h2>
          <label htmlFor="" className="w-11/12 mb-2 lato font-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter Your Username"
            className="border border-[#4CAF50] rounded-md w-11/12 px-5 py-2 focus:outline-none mb-5 placeholder:text-[#4CAF50]"
            name="username"
            required
          />
          <label htmlFor="" className="w-11/12 mb-2 lato font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="border border-[#4CAF50] rounded-md w-11/12 px-5 py-2 focus:outline-none mb-5 placeholder:text-[#4CAF50]"
            name="email"
            required
          />
          <label htmlFor="" className="w-11/12 mb-2 lato font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="border border-[#4CAF50] rounded-md w-11/12 px-5 py-2 focus:outline-none mb-5 placeholder:text-[#4CAF50]"
            name="password"
            required
            minLength={5}
          />
          <label htmlFor="" className="w-11/12 mb-2 lato font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="border border-[#4CAF50] rounded-md w-11/12 px-5 py-2 focus:outline-none placeholder:text-[#4CAF50]"
            name="confirmPassword"
            required
            minLength={5}
          />
          <button className="bg-[#4CAF50] text-white rounded-md mt-10 px-16 py-2 cursor-pointer">
            Sign up
          </button>
          <Link to="/login" className="mt-5 underline text-[#4CAF50]">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </section>
  );
}
