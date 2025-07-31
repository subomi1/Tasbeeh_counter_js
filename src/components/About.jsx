export default function About() {
  return (
    <section className="p-5" id="message">
      <h2 className="text-md sm:text-lg lg:text-lg font-bold mb-2 text-center">
        A Message
      </h2>
      <hr className="mb-1"/>
      <p className=" text-sm md:text-lg italic mb-2 text-center">
        {" "}
        Although this web app was created to help digitize the counting of dhikr
        and encourage frequent remembrance of Allah, it is best to perform dhikr
        with our hands, as they will testify for us on the Day of Judgment.
      </p>
      <p className="font-bold text-xs md:text-sm text-center">
        "That Day, We will seal over their mouths, and their hands will speak to
        Us, and their feet will testify to what they used to earn." — Surah
        Ya-Sin (36:65)
      </p>
    </section>
  );
}
