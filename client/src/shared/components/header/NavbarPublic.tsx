// Desc: NavbarPrivate component for the auth module
// Location: src/modules/auth/components/common/NavbarPrivate.tsx
// File: NavbarPrivate.tsx
// Module: auth
// State: Pending
// Type: Component
// Description: NavbarPrivate component for the auth module
// Component: NavbarPrivate
import {Link} from "react-router-dom";

export default function NavbarPublic({
  currentSection,
  buttonBack,
  pathName,
}: {
  currentSection: string;
  buttonBack?: boolean;
  pathName?: string;
}) {
    return (
        <div className="bg-[#072146] py-1 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to={"/"} className="text-white font-bold text-lg">
                        <img
                            src="../../../../public/unimonserrate.png"
                            alt="logo"
                            className="h-14 w-auto"
                        />
                    </Link>
                    <div className="flex items-center">
                        <a
                            className="text-white font-bbva px-3 py-2 rounded-md text-base font-medium"
                        >
                            {currentSection}
                        </a>
                    </div>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0">
                {buttonBack &&
                    <Link
                        to={"/" + (pathName ? pathName : "")}
                        className="bg-[#028484] h-full w-16 flex justify-center items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-white size-[30px]"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"/>
                        </svg>
                    </Link>
                }
            </div>
        </div>
    );
}