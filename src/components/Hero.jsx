import HeroImg from "../assets/hero.jpg";

export default function Hero() {
  return (
    // <section className="flex justify-center mt-20">
    //     <div className="w-4xl bg-black h-64 rounded-2xl">
    //         <img src={HeroImg} alt="" className='w-full h-full object-cover rounded-2xl object-top'/>
    //     </div>
    // </section>

    <section className="flex flex-col items-center justify-center mt-10 px-4">
      <div className="w-full max-w-6xl bg-black h-64 sm:h-72 md:h-80 lg:h-80 rounded-2xl overflow-hidden">
        <img
          src={HeroImg}
          alt="Hero"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <h1 className="font-bold mt-7 text-3xl lato">Remember Allah with Every Click</h1>
      <p className="mt-2 text-[#14b766] lato">Your companion for daily adhkar and reflection.</p>
    </section>
  );
}
