import logo from "../../../assets/images/logo-unimonserrate.png";

type NavbarProps = {
  label: string;
  buttonBackground?: string;
  buttonIconColor?: string;
  buttonAction?: () => void;
}

export default function FeatureNavbar({label, buttonBackground, buttonIconColor, buttonAction}: NavbarProps) {
  return (
    <div
      className="bg-theme-navy text-white py-2 relative"
    >
      <div
        className="flex items-center justify-between mx-auto max-w-5xl"
      >
        <img
          src={logo}
          alt="Logo de la Fundacion Universitaria Monserrate"
          className="h-16 w-auto mx-10"
        />
        <a
          className="font-family-special text-base font-semibold"
        >
          {label}
        </a>
      </div>
      {
        buttonAction && (
          <button
            onClick={buttonAction}
            className={
              `absolute inset-y-0 right-0 px-5 h-full hover:brightness-110 transition-all duration-300 ease-in-out
              ${buttonIconColor ? `text-[${buttonIconColor}]` : "text-white"}
              ${buttonBackground ? `bg-[${buttonBackground}]` : "bg-theme-teal-deep"}
              cursor-pointer`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-white"
              style={{
                color: buttonIconColor || "#fff"
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )
      }
    </div>
  )
}