import {useAppDispatch, useAppSelector} from "../../../redux/hooks/useReduxHooks.ts";
import {logout} from "../../../redux/states/auth.slice.ts";
import logo from "../../../assets/images/logo-unimonserrate.png";
import logoutIcon from "../../../assets/images/logout-svgrepo-com.svg";

function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

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
          className="h-16 w-auto mx-10"
        />
        <div className="flex flex-row items-center space-x-5">
          <div className="flex flex-row items-center space-x-2">
            <a className="text-white font-medium">
              {user?.fullName.split(' ')[0] + " " + user?.fullName.split(' ')[1]}
            </a>
            <button
              onClick={() => dispatch(logout())}
              className=" "
            >
              <img
                src={logoutIcon}
                alt={"Cerrar sesión"}
                className="h-7 w-7 hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer"
                title="Cerrar sesión"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;