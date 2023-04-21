/* eslint-disable testing-library/no-unnecessary-act */
import { act, render } from "@testing-library/react";
import HomePage from "../../Page/HomePage";
const { AXIOS } = require("../../Utils/axios");
const dataSuccess = {
  success: true,
  message: "Lấy danh sách thành công",
  data: [
    {
      url: "https://www.youtube.com/watch?v=YYmzj5DK_5s",
      user: {
        userId: "643ffe24b2251e31ada3e4e7",
        email: "daniel.nguyen@inspireventures.com",
      },
    },
  ],
};

jest.mock("../../Utils/axios", () => ({
  AXIOS: jest.fn().mockResolvedValueOnce([]),
}));

jest.mock("../../Utils/axios", () => ({
  AXIOS: jest.fn().mockRejectedValueOnce({}),
}));

describe("HomePage", () => {
  test("Render HomePage", async () => {
    await act(async () => {
       render(<HomePage />);
    });
  });
  test("should return array data when axios get listMovie request success", async () => {
    const param = {
      path: "/movie/listMovie",
      method: "GET",
    };
    AXIOS.mockResolvedValueOnce(dataSuccess);
    let result = await AXIOS(param);
    expect(result).toEqual(dataSuccess);
  });
  test("should return array data when axios get listMovie request fail", async () => {
    const param = {
      path: "/movie/listMovie",
      method: "GET",
    };
    const dataFail = {
      success: false,
      message: "Lấy danh sách không thành công",
      data: [],
      err: new Error("Some error"),
    };
    AXIOS.mockRejectedValueOnce(dataFail);
    act(async () => {
      await expect(AXIOS(param)).rejects.toEqual(dataFail);
    });
  });
});
