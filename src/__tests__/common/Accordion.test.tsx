import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Accordion from "~/components/Accordion/Accordion";

afterEach(cleanup);

const children = <p>test</p>;
const title = "Accordion test";
const footer = <p>Footer test</p>;

test("Accordion Component", () => {
  act(() => {
    render(
      <Accordion title={title} footer={footer}>
        {children}
      </Accordion>
    );
  });
  expect(screen.getByText(title)).toBeInTheDocument();
  fireEvent.click(screen.getByText(title));
});

test("test Accordion with expand more icons", () => {
  const expandedMoreIcon = <p>test expand icon</p>;
  act(() => {
    render(
      <Accordion
        title={title}
        expandMoreIcon={expandedMoreIcon}
        footer={footer}
      >
        {children}
      </Accordion>
    );
  });
  expect(screen.getByText(title)).toBeInTheDocument();
});

test("test Accordion with expand less icons and disabled padding", () => {
  const expandedLessIcon = <p>test expand icon</p>;
  const ElTitle = <h1>Test title</h1>;
  act(() => {
    render(
      <Accordion
        title={ElTitle}
        expandLessIcon={expandedLessIcon}
        disabledContentPadding={true}
      >
        {children}
      </Accordion>
    );
  });
});
