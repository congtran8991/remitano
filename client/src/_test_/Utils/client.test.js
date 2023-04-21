import {
  setCookie,
  getCookie,
  removeCookie,
  validateYouTubeUrl,
  validateEmail
} from "../../Utils/client";
describe("setCookie", () => {
  beforeEach(() => {
    // Mock the document object
    Object.defineProperty({}, "document", {
      value: {
        cookie: "",
      },
    });
  });

  afterEach(() => {
    // Reset the document object after each test
    jest.resetAllMocks();
  });

  test("should set cookie with correct name, value and expiration", () => {
    const cname = "testCookie";
    const cvalue = "testValue";
    const exdays = 1;
    const expectedCookie = `${cname}=${cvalue}`;
    setCookie(cname, cvalue, exdays);
    expect(document.cookie).toContain(expectedCookie);
  });

  test("getCookie returns value", () => {
    const cookieName = "myCookie";
    const cookieValue = "123456789";
    document.cookie = `${cookieName}=${cookieValue}`;
    const result = getCookie(cookieName);
    expect(result).toBe(cookieValue);
  });

  test("getCookie returns empty string", () => {
    const cookieName = "nonExistingCookie";
    const result = getCookie(cookieName);
    expect(result).toBe("");
  });

  test("Remove cookie", () => {
    const cookieName = "myCookie";
    const cookieValue = "123456789";
    document.cookie = `${cookieName}=${cookieValue}`;
    removeCookie(cookieName);
    expect(document.cookie.includes(`${cookieName}=`)).toBe(false);
  });

  test("Validate Url Youtube return true", () => {
    const url = "https://www.youtube.com/watch?v=gViRsnlgs6E"
    const result = validateYouTubeUrl(url)
    expect(Boolean(result)).toBe(true);
  });

  test("Validate Url Youtube return false", () => {
    const url = "https://docs.google.com/document/d/1hHI5NYLCHXB9iXTa_6JecpK5n7j4s61WcsEiJ0Qj5uE/edit#"
    const result = validateYouTubeUrl(url)
    expect(Boolean(result)).toBe(false);
  });

  test("Validate Email return true", () => {
    const url = "congtran8991@gmail.com"
    const result = validateEmail(url)
    expect(Boolean(result)).toBe(true);
  });

  test("Validate Email return false", () => {
    const url = "congtran"
    const result = validateEmail(url)
    expect(Boolean(result)).toBe(false);
  });
});
