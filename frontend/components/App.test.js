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

test("renders the leftButton", () => {
  render(<AppFunctional />)

  const leftButton = screen.queryByText(/LEFT/i);

  expect(leftButton).toBeInTheDocument();
});

test("renders the rightButton", () => {
  render(<AppFunctional />)

  const leftButton = screen.queryByText(/right/i);

  expect(leftButton).toBeInTheDocument();
});

test("renders the upButton", () => {
  render(<AppFunctional />)

  const leftButton = screen.queryByText(/up/i);

  expect(leftButton).toBeInTheDocument();
});

test("renders the downButton", () => {
  render(<AppFunctional />)

  const leftButton = screen.queryByText(/down/i);

  expect(leftButton).toBeInTheDocument();
});

test("renders the resetButton", () => {
  render(<AppFunctional />)

  const leftButton = screen.queryByText(/reset/i);

  expect(leftButton).toBeInTheDocument();
});
