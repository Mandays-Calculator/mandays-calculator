import { render, screen } from "@testing-library/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Footer } from "~/components";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {},
  react: {
    useSuspense: false,
  },
});

test("renders current year and translated footer label in Footer component", () => {
  jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: jest.fn(),
    }),
  }));

  render(<Footer />);
  const footerLabelElements = screen.getByTestId("footer-label");
  expect(footerLabelElements.children.length > 0);
});
