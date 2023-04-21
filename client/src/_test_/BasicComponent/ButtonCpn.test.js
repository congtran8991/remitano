import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ButtonCpn from "../../BasicComponent/ButtonCpn";

Enzyme.configure({ adapter: new Adapter() });
describe("ButtonCpn", () => {
  test("calls onClick handler when clicked", () => {
    render(<ButtonCpn dataTestId="defaultTestBtnId"/>)
    const btnCpn = screen.getByTestId("defaultTestBtnId");
    fireEvent.click(btnCpn)
  });
});
