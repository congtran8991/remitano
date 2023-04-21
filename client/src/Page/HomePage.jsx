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
      setListDataMovie(dataApi.data);
    } catch (error) {
      setListDataMovie([]);
    }
  };
  return (
    <div className="home-page">
      <div className="list-video">
        {listDataMovie.map((item) => {
          return (
            <div key={item._id} className="row-video">
              <Video url={item.url} />
              <Information email={item.user.email}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
