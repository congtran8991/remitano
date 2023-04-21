const { AXIOS } = require("../../../Utils/axios");

jest.mock("../../../Utils/axios", () => ({
  AXIOS: jest.fn().mockResolvedValueOnce([]),
}));

jest.mock("../../../Utils/axios", () => ({
  AXIOS: jest.fn().mockRejectedValueOnce({}),
}));

describe("UserLogin", () => {
  test("should return data when axios post regis or login request success", async () => {
    const dataSuccess = {
      isSuccess: true,
      data: {
        data: {
          email: "congtran8991@gmail.com",
          id: "123456",
        },
        message: "Login thành công",
        success: true,
        token: "eyJhbGciOiJIUzI1",
      },
    };
    const param = {
      path: "/loginUser/regis",
      data: { email: "congtran8991@gmail.com", passWord: "1234www56" },
      method: "POST",
    };
    AXIOS.mockResolvedValueOnce(dataSuccess);
    let result = await AXIOS(param);
    expect(result).toEqual(dataSuccess);
  });
  test("should return array data when axios post regis or login request fail", async () => {
    const param = {
      path: "/loginUser/regis",
      data: { email: "congtran8991@gmail.com", passWord: "1234wffww56" },
      method: "POST",
    };
    const dataFail = {
      isSuccess: false,
      error: "Cannot read property 'token' of undefined",
    };
    AXIOS.mockRejectedValueOnce(dataFail);
    await expect(AXIOS(param)).rejects.toEqual(dataFail);
  });

  test("should return data when axios post checkToken request success", async () => {
    const dataSuccess = {
      isSuccess: true,
      data: {
        data: {
          email: "congtran8991@gmail.com",
          id: "123456",
        },
        message: "Login thành công",
        success: true,
        token: "eyJhbGciOiJIUzI1",
      },
    };
    const param = {
      path: "/loginUser/checkToken",
      token: "eyJhbGciOiJIUzI1",
      method: "POST",
    };
    AXIOS.mockResolvedValueOnce(dataSuccess);
    let result = await AXIOS(param);
    expect(result).toEqual(dataSuccess);
  });
  test("should return data when axios post checkToken request fail", async () => {
    const dataFail = {
      isSuccess: false,
      error: "Cannot read property 'token' of undefined",
    };
    const param = {
      path: "/loginUser/checkToken",
      token: "eyJhbGciOiJIUzI1",
      method: "POST",
    };
    AXIOS.mockRejectedValueOnce(dataFail);
    await expect(AXIOS(param)).rejects.toEqual(dataFail);
  });
});
