import {useAppSelector} from "../../redux/hooks/useReduxHooks.ts";

export default function HomePage() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome, {user?.fullName}</p>
        </div>
    );
}