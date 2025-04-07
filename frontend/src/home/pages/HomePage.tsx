import Hero from "../components/hero/Hero.tsx";
import Navbar from "../components/navigation/Navbar.tsx";

export default function HomePage() {
    return (
        <div
            className="bg-theme-gray-lightest min-h-screen"
        >
            <Navbar />
            <Hero/>
        </div>
    );
}