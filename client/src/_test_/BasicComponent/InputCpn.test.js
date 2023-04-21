
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputCpn from "../../BasicComponent/InputCpn";


describe("ButtonCpn", () => {
  test("calls onClick handler when clicked", () => {
    render(<InputCpn dataTestId="defaultTestInputId"/>)
    const inputCpn = screen.getByTestId("defaultTestInputId");
    fireEvent.change(inputCpn)
  });
});
