import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkSession } from "../Redux/reducer/userLoginSlice";
import { getCookie, removeCookie } from "../Utils/client";
const FetchApi = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = getCookie("token");
        !token && removeCookie("token")
        token && dispatch(checkSession(token))
    }, [dispatch])
    return null
}

export default FetchApi