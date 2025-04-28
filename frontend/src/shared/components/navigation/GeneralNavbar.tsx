import logo from "../../../assets/images/logo-unimonserrate.png";
import {Link, useNavigate} from "react-router-dom";

type NavItem = {
  label: string;
  to: string;
}

const items: NavItem[] = [
  {
    label: "Libros",
    to: "/books"
  },
  {
    label: "Computadores",
    to: "/computers"
  },
  {
    label: "Salas",
    to: "/rooms"
  }
]

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 260"
      height="24px"
      width="24px"
    >
      <path
        fill="currentColor"
        d="M182.85 162.85a90 90 0 1 0-20 20L220 240l20-20zM150 110a40 40 0 0 0-40-40V50a60 60 0 0 1 60 60z"
      >
      </path>
    </svg>
  );
};

export default function GeneralNavbar() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-theme-royal-blue bg-opacity-90 text-white py-2 shadow-md"
    >
      <div
        className="flex items-center justify-between mx-auto max-w-5xl"
      >
        <img
          src={logo}
          alt="Logo de la Fundacion Universitaria Monserrate"
          className="h-16 w-auto "
        />
        <ul className="flex flex-row items-center justify-center space-x-7">
          {items.map((item, index) => (
            <li
              key={index}
              className={"h-full"}
            >
              <Link
                to={item.to}
                className="flex items-center justify-center hover:opacity-75 transition-all duration-300 ease-in-out relative h-16 translate-y-0.5"
              >
                <span className="text-[15px] font-medium">{item.label}</span>
                {location.pathname === item.to && (
                  <span className="absolute -bottom-1.5 h-1 w-[calc(100%)] bg-white"/>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-row items-center space-x-5">
          <div className="flex flex-row items-center -space-x-0.5">
            <SearchIcon/>
            <input
              type="text"
              placeholder="Buscar aquí"
              className="bg-transparent text-[14.5px] border-white focus:outline-none focus:border-white ml-2 text-white placeholder:text-white w-22.5 transition-all duration-300 ease-in-out"
              style={{
                color: "#fff"
              }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/home")}
        className="bg-theme-medium-blue absolute inset-y-0 right-0 px-5 h-20 hover:brightness-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M20.239 3.749a.75.75 0 0 0-.75.75V15H5.549l2.47-2.47a.75.75 0 0 0-1.06-1.06l-3.75 3.75a.75.75 0 0 0 0 1.06l3.75 3.75a.75.75 0 1 0 1.06-1.06L5.55 16.5h14.69a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-.75-.751Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

    </div>
  );
}