import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-green-800 text-white pt-8 pb-3 rounded-t-lg mt-5 border-t border-green-700">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold">Tasbeeh Counter</h2>
          <p className="mt-2 text-sm">Made with ❤️ for Muslims</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                to="/"
                className="hover:underline transition-all duration-300 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:underline cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/favourite"
                className="hover:underline cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Favourite
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="hover:underline cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                History
              </Link>
            </li>
          </ul>
        </div>
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
