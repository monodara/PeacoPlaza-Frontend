import { CategoryType } from "../../misc/type";

export default function CategoryCard({ category }: { category: CategoryType }) {
  const encodedId = encodeURIComponent(category.id); //id needs to be protected???

  return (
    <div className="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <img className="rounded-t-lg" src={category.image} alt="" />
      </div>
      <div className="pt-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {category.name}
        </h5>
      </div>

      <div className="pb-6">
        <a
          href={`products/?categoryId=${encodedId}`}
          className="inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
        >
          Shop now
        </a>
      </div>
    </div>
  );
}
