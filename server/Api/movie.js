import { Router } from "express";
import movie, { find } from "../Models/movie";
import { validateYouTubeUrl } from "../Utils";
import { checkToken as _checkToken } from "./checkToken";
const auth = _checkToken;
const router = Router();

router.post("/addListMovie", auth, async (req, res) => {
  const { url, user } = req.body;
  const isValidateUrl = validateYouTubeUrl(url);
  if (!isValidateUrl) {
    return res.send({
      success: false,
      message: "URL không hợp lệ",
    });
  }
  let dataMovie = new movie({
    url: url,
    user,
  });
  try {
    await dataMovie.save();
    return res.status(200).json({
      success: true,
      message: "Thêm Url thành công",
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Thêm URL không thành công",
      err,
    });
  }
});

router.get("/listMovie", async (req, res) => {
  try {
    const dataMovie = await find({});
    res.status(200).json({
      success: true,
      message: "Lấy danh sách thành công",
      data: dataMovie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Lấy danh sách không thành công",
      data: [],
      err,
    });
  }
});

export default router;
