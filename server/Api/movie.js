const express = require("express");
const movie = require("../Model/movie");
const user = require("../Model/user");
const router = express.Router();

// router.post("/addListMovie", (req, res) => {
//   const { url, userId } = req.body;
//   let dataMovie = new movie({
//     url: url,
//     userId,
//   });
//   dataMovie
//     .save()
//     .then(() => {
//       return res.status(200).json({
//         success: true,
//         message: "Thêm Url thành công",
//       });
//     })
//     .catch((err) => {
//       res.send({
//         success: false,
//         message: "Thêm URL không thành công",
//         err,
//       });
//     });
// });

router.post("/addListMovie", async (req, res) => {
  const { url, user } = req.body;
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
    const dataMovie = await movie.find({});
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

module.exports = router;
