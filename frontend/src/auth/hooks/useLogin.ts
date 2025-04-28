import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/states/auth.slice.ts";
import {useState} from "react";

export default function useLogin() {
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogin = async (data: Record<string, never>) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      navigate("/home")
    } else {
      setError(true);
    }
  };

  return {handleLogin, error};
}