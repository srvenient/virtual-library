import logo from "../../../assets/images/logo-unimonserrate.png";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/useReduxHooks.ts";
import {logout} from "../../../redux/states/auth.slice.ts";

function Navbar() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div
            className="bg-theme-deep-sky-blue-light bg-opacity-90 text-white py-2 shadow-md"
        >
            <div
                className="flex items-center justify-between mx-auto max-w-5xl"
            >
                <img
                    src={logo}
                    alt="Logo de la Fundacion Universitaria Monserrate"
                    className="h-16 w-auto mx-10"
                />
                <div className="flex items-center space-x-0">
                    <a className="text-white px-1 py-2 rounded-md text-base font-semibold font-family-special">
                        {user?.fullName}
                    </a>
                    <button
                        onClick={() => dispatch(logout())}
                        className="h-full w-10 flex justify-center items-center p-0 hover:opacity-30 rounded-md transition-all duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 text-white">
                            <path
                                fillRule="evenodd"
                                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;