import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(true)
// })

test('renders without errors', () => {
 render(<AppFunctional />)
});

test("renders the header", () => {
  render(<AppFunctional />)

  const leftButton = screen.queryByText(/LEFT/i);

  expect(leftButton).toBeInTheDocument();
});
