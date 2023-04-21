import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkSession } from "../Redux/reducer/userLoginSlice";
import { getCookie, removeCookie } from "../Utils/client";
const FetchApi = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const accessToken = getCookie("access_token");
        const refreshToken = getCookie("refresh_token");
        !accessToken && removeCookie("access_token")
        !refreshToken && removeCookie("refreshToken")
        refreshToken && dispatch(checkSession(refreshToken))
    }, [dispatch])
    return null
}

export default FetchApi