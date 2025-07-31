import FetchCategories from "./FetchCategories";

export default function Categories() {
  return (
    <section className="p-5">
      <h1 className="text-center font-bold lato text-2xl sm:text-4xl mb-8 border-b-2">
        Categories
      </h1>
      <FetchCategories />
    </section>
  );
}
