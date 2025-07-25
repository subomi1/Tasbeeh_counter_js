import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
        alert('User Successfully logged in')
        navigate('/')
      })
      .catch((error) =>{
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
            minLength={5}
          />
          <button className="bg-[#4CAF50] text-white rounded-md mt-10 px-10 py-2 cursor-pointer">
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
