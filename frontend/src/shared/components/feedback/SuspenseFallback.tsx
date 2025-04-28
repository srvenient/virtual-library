import {motion} from "framer-motion";
import logo from "../../../assets/images/logo-unimonserrate.png";

export default function SuspenseFallback() {
  return (
    <div className="bg-theme-navy flex items-center justify-center h-screen">
      <motion.img
        src={logo}
        alt="logo"
        className="h-52 w-1/3"
        initial={{opacity: 0.3}}
        animate={{
          opacity: 1,
          maskImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0.3) 100%)",
        }}
        transition={{duration: 1.5}}
      />
    </div>
  );
}