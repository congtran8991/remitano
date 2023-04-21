import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputCpn from "../BasicComponent/InputCpn";
import ButtonCpn from "../BasicComponent/ButtonCpn";
import { useNavigate } from "react-router-dom";
import { userLoginSlice } from "../Redux/reducer/userLoginSlice";
import { AXIOS } from "../Utils/axios";
import { getCookie } from "../Utils/client";
import { validateYouTubeUrl } from "../Utils/client";
import { toast } from "react-toastify";
const SharePage = () => {
  const dataUserLogin = useSelector(userLoginSlice);
  const navigate = useNavigate();
  const [urlVideo, setUrlVideo] = useState("");
  useEffect(() => {
    if (!dataUserLogin.isLogin) {
      return navigate("/");
    }
  }, [dataUserLogin.isLogin, navigate]);
  const handleChangeUrl = (e) => {
    setUrlVideo(e.target.value);
  };

  const handleShareUrl = async () => {
    const isValidateUrl = validateYouTubeUrl(urlVideo);
    if (!isValidateUrl)
      return toast.warn("Url không hợp lệ", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    try {
      const refreshToken = getCookie("refresh_token");
      const param = {
        path: "/movie/addListMovie",
        token: refreshToken,
        data: {
          url: urlVideo,
          user: {
            userId: dataUserLogin.data.data.id,
            email: dataUserLogin.data.data.email,
          },
        },
        method: "POST",
      };
      await AXIOS(param);
      toast.success("Thêm Url thành công", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };
  return (
    <div className="wrapper-share">
      <div>Youtube URL: &ensp;</div>
      <div>
        <div>
          <InputCpn
            dataTestId="input-url"
            value={urlVideo}
            onChange={handleChangeUrl}
            style={{ height: "30px", width: "300px" }}
          />
        </div>
        <div>
          <ButtonCpn
            dataTestId="btn-shareUrl"
            style={{ height: "30px", width: "305px", marginTop: "5px" }}
            title="Share"
            onClick={handleShareUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default SharePage;
