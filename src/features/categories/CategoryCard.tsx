import { Link } from "react-router-dom";
import { CategoryType } from "../../misc/type";
import { CategoryReadDto } from "./categoryDto";
import { useTheme } from "../theme/ThemeContext";
import { useAppDispatch } from "../../app/store";
import { setCategoryBy } from "../shared/filterSortSlice";

export default function CategoryCard({
  category,
}: {
  category: CategoryReadDto;
}) {
  const dispatch = useAppDispatch();

  const encodedId = encodeURIComponent(category.id); //id needs to be protected???
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.background.default;
  const secondaryColor = theme.palette.secondary.main;

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-green-400">
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <img
          className="flex items-end justify-end h-60 w-full bg-cover"
          style={{
            backgroundImage: `url(${category.image})`,
          }}
        />
      </div>
      <div className="pt-6">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-gray-100"
          style={{ color: primaryColor }}
        >
          {category.name}
        </h5>
      </div>

      <div className="pb-6">
        <Link
          to="/products"
          onClick={() => dispatch(setCategoryBy(category.id))}
        >
          <div
            className="inline-block cursor-pointer rounded text-gray-100 font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
            style={{ color: primaryColor }}
          >
            Shop now
          </div>
        </Link>
      </div>
    </div>
  );
}
