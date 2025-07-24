import DuaData from "../json/dua.json";
import DuaBackground from "../assets/Dua.png";
import { useState, useEffect } from "react";

export default function RandomDua() {
  const [currentDua, setCurrentDua] = useState(0);
  const [fade, setFade] = useState(false);
  const [animate, setAnimate] = useState(true);

  function handleCurrentDua() {
    setAnimate(false); // trigger exit animation

    setTimeout(() => {
      setCurrentDua((prev) => (prev >= DuaData.length - 1 ? 0 : prev + 1));
      setAnimate(true);
    }, 300);
  }
  useEffect(() => {
    const interval = setInterval(handleCurrentDua, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="flex flex-col items-center justify-center mt-10 px-4">
      <h1 className="w-full max-w-6xl text-[#0e141b] text-md sm:text-lg lg:text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4 mb-2">Dua's of the day</h1>
      <div className="w-full max-w-6xl h-96 sm:h-64 md:h-64 lg:h-56 rounded-2xl overflow-hidden relative">
        <img
          src={DuaBackground}
          alt="Hero"
          className="w-full h-full object-cover z-0 absolute top-0 right-0 left-0 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

        <div
          key={currentDua}
          className={`absolute z-10 text-white bg-opacity-60 p-2 rounded top-0 left-0 w-full h-full flex flex-col justify-center
            transition-all duration-300 ease-in-out
            ${
              animate
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }
          `}
        >
          <div className="space-y-1 text-white">
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl font-bold">
              {DuaData[currentDua].title}
            </h1>

            <p className="text-base sm:textsm font-arabic leading-relaxed">
              {DuaData[currentDua].arabic}
            </p>

            <p className="text-sm text-gray-200 italic">
              {DuaData[currentDua].latin}
            </p>

            <p className="text-sm text-gray-100">
              {DuaData[currentDua].translation}
            </p>

            <p className="text-xs text-gray-300">
              {DuaData[currentDua].fawaid}
            </p>
          </div>
        </div>
      </div>
      <h1>random</h1>
    </section>
  );
}
