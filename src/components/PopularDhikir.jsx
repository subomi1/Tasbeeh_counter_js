import FetchCategories from "./FetchCategories";
export default function PopularDhikir() {
  return (
    <section className="p-5">
      <h1 className="text-md sm:text-lg lg:text-lg font-bold mb-3">Popular Dhikir Categories</h1>
      <FetchCategories/>
    </section>
  );
}
