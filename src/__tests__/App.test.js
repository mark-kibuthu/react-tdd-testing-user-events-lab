import { render, screen,fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  // your test code here
  render(<App />);

  // Check for name input
  const nameInput = screen.getByLabelText(/name:/i);
  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toHaveAttribute("type", "text");

  // Check for email input
  const emailInput = screen.getByLabelText(/email:/i);
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute("type", "email");
});

test("the form includes three checkboxes to select areas of interest", () => {
  // your test code here
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const jsCheckbox = screen.getByLabelText(/javascript/i);
  const cssCheckbox = screen.getByLabelText(/css/i);

  expect(reactCheckbox).toBeInTheDocument();
  expect(jsCheckbox).toBeInTheDocument();
  expect(cssCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  // your test code here
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const jsCheckbox = screen.getByLabelText(/javascript/i);
  const cssCheckbox = screen.getByLabelText(/css/i);

  expect(reactCheckbox).not.toBeChecked();
  expect(jsCheckbox).not.toBeChecked();
  expect(cssCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  // your test code here
  render(<App />);

  const nameInput = screen.getByLabelText(/name:/i);
  const emailInput = screen.getByLabelText(/email:/i);

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

  expect(nameInput.value).toBe('John Doe');
  expect(emailInput.value).toBe('john.doe@example.com');
});

test("checked status of checkboxes changes when user clicks them", () => {
  // your test code here
  render(<App />);

  const reactCheckbox = screen.getByLabelText(/react/i);
  const jsCheckbox = screen.getByLabelText(/javascript/i);
  const cssCheckbox = screen.getByLabelText(/css/i);

  fireEvent.click(reactCheckbox);
  fireEvent.click(jsCheckbox);

  expect(reactCheckbox).toBeChecked();
  expect(jsCheckbox).toBeChecked();
  expect(cssCheckbox).not.toBeChecked();

  fireEvent.click(reactCheckbox);
  expect(reactCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  // your test code here
  render(<App />);

  const nameInput = screen.getByLabelText(/name:/i);
  const emailInput = screen.getByLabelText(/email:/i);
  const reactCheckbox = screen.getByLabelText(/react/i);

  fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
  fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
  fireEvent.click(reactCheckbox);

  const submitButton = screen.getByText(/submit/i);
  fireEvent.click(submitButton);

  expect(screen.getByText(/thank you, jane doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: react/i)).toBeInTheDocument();
});
