import {Navigate, Outlet} from "react-router-dom";
import {AppStore} from "../../../redux/store.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/useReduxHooks.ts";
import {useEffect, useState} from "react";
import {fetchUser, logout} from "../../../redux/states/auth.slice.ts";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
    const dispatch = useAppDispatch();
    const authenticated = useAppSelector((state: AppStore) => state.auth.authenticated);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (!Cookies.get("token")) {
                dispatch(logout());
                setLoading(false);
                return;
            }

            dispatch(fetchUser())
                .unwrap()
                .catch(() => dispatch(logout()))
                .finally(() => setLoading(false));
        })();
    }, [authenticated, dispatch]);

    if (loading) return null;
    if (!loading && !authenticated) return <Navigate to="/" replace={true}/>;

    return <Outlet/>;
}
