import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/states/auth.slice.ts";

export default function useLogin() {
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const handleLogin = async (data: Record<string, any>) => {
        const result = await dispatch(login(data));
        if (login.fulfilled.match(result)) {
            navigate("/home")
        } else {
            navigate("/errors/invalid-credentials");
        }
    };

    return {handleLogin};
}