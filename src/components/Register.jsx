import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { email, password, username } = data;
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((userCredentials) => {
        toast.success("user successfully registered")
        navigate("/login")
        const user = userCredentials.user;
        return updateProfile(user, {
          displayName: username,
        });
      })
      .catch((error) => {
        toast.error("Something went wrong Please Try Again!")
      });
  }

  const [frontPass, setFrontPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const rules = {
    length: frontPass.length >= 8,
    uppercase: /[A-Z]/.test(frontPass),
    lowercase: /[a-z]/.test(frontPass),
    number: /[0-9]/.test(frontPass),
    specialChar: /[@#$%^&+=!]/.test(frontPass),
    noWhiteSpace: !/\s/.test(frontPass),
  };
  const isPasswordValid = Object.values(rules).every(Boolean);
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
            value={frontPass}
            onChange={(e) => setFrontPass(e.target.value)}
          />
          {frontPass && (
            <ul className="mb-4 space-y-1 text-xs self-start ml-4">
              <li className={rules.length ? "text-green-600" : "text-red-600"}>
                {rules.length ? "✅" : "❌"} At least 8 characters
              </li>
              <li
                className={rules.uppercase ? "text-green-600" : "text-red-600"}
              >
                {rules.uppercase ? "✅" : "❌"} At least one uppercase letter
              </li>
              <li
                className={rules.lowercase ? "text-green-600" : "text-red-600"}
              >
                {rules.lowercase ? "✅" : "❌"} At least one lowercase letter
              </li>
              <li className={rules.number ? "text-green-600" : "text-red-600"}>
                {rules.number ? "✅" : "❌"} At least one number
              </li>
              <li
                className={
                  rules.specialChar ? "text-green-600" : "text-red-600"
                }
              >
                {rules.specialChar ? "✅" : "❌"} At least one special character
              </li>
            </ul>
          )}
          <label htmlFor="" className="w-11/12 mb-2 lato font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="border border-[#4CAF50] rounded-md w-11/12 px-5 py-2 focus:outline-none placeholder:text-[#4CAF50]"
            name="confirmPassword"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          {confirmPass == frontPass ? "" : <p className="text-xs underline mt-2 text-red-600 self-start ml-4">Passwords do not match</p>}
          <button
            className={isPasswordValid ? "bg-[#4CAF50] text-white rounded-md mt-10 px-16 py-2 cursor-pointer" : "bg-[#458847] text-white rounded-md mt-10 px-16 py-2 cursor-pointer"}
            disabled={!isPasswordValid}
          >
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
