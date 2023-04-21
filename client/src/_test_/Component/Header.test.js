/* eslint-disable testing-library/no-unnecessary-act */
import { render, fireEvent, screen, act } from "@testing-library/react";
import Header from "../../Component/Header";
import InputCpn from "../../BasicComponent/InputCpn";
import ButtonCpn from "../../BasicComponent/ButtonCpn";
import ProviderMock from "../../_Mock_/ProviderMock";
// import { act } from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("../../Utils/axios", () => ({
  AXIOS: jest.fn().mockResolvedValueOnce([]),
}));

jest.mock("../../Utils/axios", () => ({
  AXIOS: jest.fn().mockRejectedValueOnce({}),
}));

describe("Header", () => {
  test("Render SharePage", () => {
    const component = render(
      <ProviderMock>
        <Header />
      </ProviderMock>
    ).toJSON;
    expect(component).toMatchSnapshot();
  });
  test("Should update URL video", () => {
    const handleChangeUrl = jest.fn();
    const wrapper = shallow(<InputCpn value="" onChange={handleChangeUrl} />);

    const input = wrapper.find("input");
    const updatedUrl = "https://www.example.com/updated";

    input.simulate("change", { target: { value: updatedUrl } });
    expect(handleChangeUrl).toHaveBeenCalled();
    expect(handleChangeUrl).toHaveBeenCalledWith({
      target: { value: updatedUrl },
    });
  });
  test("Should handle login success", async () => {
    render(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    const inputEmail = screen.getByTestId("input-email");
    const inputPassword = screen.getByTestId("input-password");
    const btnLogin = screen.getByTestId("btn-login");
    await act(async () => {
      fireEvent.change(inputEmail, { target: { value: "congtran@gmail.com" } });
      fireEvent.change(inputPassword, { target: { value: "12345" } });
      fireEvent.click(btnLogin);
    });
  });
  test("Should handle login fail, username or pass not invalid", async () => {
    render(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    const inputEmail = screen.getByTestId("input-email");
    const inputPassword = screen.getByTestId("input-password");
    const btnLogin = screen.getByTestId("btn-login");
    await act(async () => {
      fireEvent.change(inputEmail, { target: { value: "congtran" } });
      fireEvent.change(inputPassword, { target: { value: "" } });
      fireEvent.click(btnLogin);
    });
  });
});
