import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        toast.success("User Successfully logged in");
        navigate("/");
      })
      .catch((error) => {
        const code = error.code;
        toast.error(code.slice(5));
      });
  }
  const [frontPass, setFrontPass] = useState("");
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
            Login to Your Account
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="border border-[#4CAF50] rounded-md w-11/12 px-5 py-2 focus:outline-none mb-5"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-[#4CAF50] rounded-md w-11/12 px-5 py-2 focus:outline-none"
            name="password"
            required
            minLength={6}
            value={frontPass}
            onChange={(e) => setFrontPass(e.target.value)}
          />
          {frontPass && (
            <ul className="mt-4 space-y-1 text-xs self-start ml-4">
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
          <button
            type="submit"
            className={isPasswordValid ? "bg-[#4CAF50] text-white rounded-md mt-10 px-10 py-2 cursor-pointer" : "bg-[#55a257] text-white rounded-md mt-10 px-10 py-2 cursor-pointer"}
            disabled={!isPasswordValid}
          >
            Log in
          </button>
          <Link to="/register" className="mt-5 underline text-[#4CAF50]">
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </section>
  );
}
