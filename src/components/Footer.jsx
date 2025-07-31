import { Link } from "react-scroll";
import logo from "../assets/OIP__1_-removebg-preview.png";
export default function Footer() {
  return (
    <footer className="bg-green-800 text-white pt-8 pb-3 rounded-t-lg mt-5 border-t border-green-700">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo */}
        <div>
          <h2 className="text-xl font-bold">Tasbeeh Counter</h2>
          <p className="mt-2 text-sm">Made with ❤️ for Muslims</p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="hero" smooth duration={500} className="hover:underline transition-all duration-300 cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="pop" smooth duration={500}className="hover:underline cursor-pointer">
                Popular Dhikr Categories
              </Link>
            </li>
            <li>
              <Link to="recent"  smooth duration={500} className="hover:underline cursor-pointer">
                Most Recent
              </Link>
            </li>
            <li>
              <Link to="message" smooth duration={500} className="hover:underline cursor-pointer">
                A Message
              </Link>
            </li>
            <li>
              <Link to="dua" duration={300} smooth className="hover:underline cursor-pointer">
                Dua's of the Day
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Quote or Contact */}
        <div className="text-sm">
          <p>
            “That Day, We will seal over their mouths, and their hands will
            speak to Us...”
          </p>
          <p className="mt-2 italic">— Surah Ya-Sin (36:65)</p>
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-gray-300">
        &copy; {new Date().getFullYear()} Tasbeeh Counter. All rights reserved.
      </div>
    </footer>
  );
}
