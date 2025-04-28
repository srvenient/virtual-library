import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";
import {useState} from "react";
import {register} from "../../redux/states/auth.slice.ts";

export default function useRegister() {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const reset = () => {
    setError(false);
    setSuccess(false);
  }

  const handleRegister = async (data: Record<string, any>) => {
    reset();

    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return {handleRegister, error, success};
}