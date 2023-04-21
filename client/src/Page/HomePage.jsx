import React, { useEffect, useState } from "react";
import Video from "../Component/HomePage/Video";
import Information from "../Component/HomePage/Information";
import { AXIOS } from "../Utils/axios";

const HomePage = () => {
  const [listDataMovie, setListDataMovie] = useState([]);
  useEffect(() => {
    getListMovieData();
  }, []);
  const getListMovieData = async () => {
    try {
      const param = {
        path: "/movie/listMovie",
        method: "GET",
      };
      let dataApi = await AXIOS(param);
      const reverseData = dataApi.data.reverse();
      setListDataMovie(reverseData);
    } catch (error) {
      setListDataMovie([]);
    }
  };
  return (
    <div className="home-page">
      <div>Hiện đang có <span>{listDataMovie.length}</span> hiển thị</div>
      <div className="list-video">
        {listDataMovie.length ? (
          listDataMovie.map((item) => {
            return (
              <div key={item._id} className="row-video">
                <Video url={item.url} />
                <Information email={item.user.email} />
              </div>
            );
          })
        ) : (
          <>
            <div className="text-center">Chưa có video nào</div>
            <div className="text-center">
              Bạn có thể nhấn vào nút Share a movie để điều hướng đến trang
              share movie
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
