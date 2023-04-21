import { render, fireEvent, screen } from "@testing-library/react";
import Share from "../../Page/Share";
import InputCpn from "../../BasicComponent/InputCpn";
import ButtonCpn from "../../BasicComponent/ButtonCpn";
import ProviderMock from "../../_Mock_/ProviderMock";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("../../Utils/axios", () => ({
  AXIOS: jest.fn().mockResolvedValueOnce([]),
}));

jest.mock("../../Utils/axios", () => ({
  AXIOS: jest.fn().mockRejectedValueOnce({}),
}));

describe("SharePage", () => {
  test("Should handle share video on success", () => {
    render(
      <ProviderMock>
        <Share />
      </ProviderMock>
    );
    const url = "https://www.youtube.com/watch?v=gViRsnlgs6E";
    const inputEmail = screen.getByTestId("input-url");
    fireEvent.change(inputEmail, { target: { value: url } });
    const btnLogin = screen.getByTestId("btn-shareUrl");
    fireEvent.click(btnLogin);
  });

  test("Should handle share video invalid", () => {
    render(
      <ProviderMock>
        <Share />
      </ProviderMock>
    );
    const url = "https:?v=gViRsnlgs6E";
    const inputEmail = screen.getByTestId("input-url");
    fireEvent.change(inputEmail, { target: { value: url } });
    const btnLogin = screen.getByTestId("btn-shareUrl");
    fireEvent.click(btnLogin);
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
});
