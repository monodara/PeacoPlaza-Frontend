import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

import logo from "../../images/logo.png";
import { useTheme } from "./ThemeContext";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All products", href: "/products" },
];

const categories = [
  { label: "Clothes", categoryId: 1 },
  { label: "Shoes", categoryId: 2 },
  { label: "Electronics", categoryId: 3 },
  { label: "Furniture", categoryId: 4 },
];

export default function Footer() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  return (
    <footer
      className="px-6 mt-10 border-t-2 border-gray-200"
      style={{ backgroundColor: backgroundColor, color: textPrimaryColor }}
    >
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div>
            <p
              className="font-semibold text-left"
              style={{
                color: textPrimaryColor,
              }}
            >
              Quick Links
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className=" hover:underline hover:text-blue-500"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              className="font-semibold text-left"
              style={{
                color: textPrimaryColor,
              }}
            >
              Categories
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              {categories.map(({ label, categoryId }) => (
                <Link
                  key={label}
                  to={`/products/?categoryId=${categoryId}`}
                  className=" hover:underline hover:text-blue-500"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8" />

        <div className="flex items-center justify-between">
          <Link to="/">
            <img className="w-auto h-7" src={logo} alt="logo" />
          </Link>

          <div className="flex -mx-2">
            <a
              href="#"
              className="mx-2 text-gray-600 hover:text-blue-500"
              aria-label="Reddit"
            >
              <RedditIcon />
            </a>
            <a
              href="#"
              className="mx-2 text-gray-600 hover:text-blue-500"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              className="mx-2 text-gray-600 hover:text-blue-500"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
