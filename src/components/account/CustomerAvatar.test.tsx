import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CustomerAvatar } from "./CustomerAvatar";

describe("CustomerAvatar", () => {
  it("renders a premium initials fallback without an invented image", () => {
    const { container } = render(
      <CustomerAvatar firstName="Nehad" lastName="Moghrabi" decorative />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".customer-avatar__initials")).toHaveTextContent("NM");
  });

  it("shows a real image only after it loads", async () => {
    const { container } = render(
      <CustomerAvatar
        firstName="Nehad"
        lastName="Moghrabi"
        profileImage="https://assets.example.com/nehad.webp"
      />,
    );
    const image = container.querySelector("img")!;
    expect(container.querySelector(".customer-avatar__skeleton")).toBeInTheDocument();
    fireEvent.load(image);
    await waitFor(() => expect(image).toHaveAttribute("data-loaded", "true"));
    expect(container.querySelector(".customer-avatar__skeleton")).toBeNull();
    expect(container.querySelector(".customer-avatar__initials")).toBeNull();
  });

  it("falls back to current initials when the stored image is broken", async () => {
    const { container } = render(
      <CustomerAvatar
        firstName="محمد"
        lastName="أحمد"
        profileImage="https://assets.example.com/missing.webp"
        decorative
      />,
    );
    fireEvent.error(container.querySelector("img")!);
    await waitFor(() =>
      expect(container.querySelector(".customer-avatar__initials")).toHaveTextContent("مأ"),
    );
    expect(container.querySelector("img")).toBeNull();
  });

  it("updates derived initials when the customer name changes", () => {
    const view = render(<CustomerAvatar firstName="Nehad" lastName="Moghrabi" decorative />);
    expect(view.container).toHaveTextContent("NM");
    view.rerender(<CustomerAvatar firstName="Nehad" lastName="Hassan" decorative />);
    expect(view.container).toHaveTextContent("NH");
  });
});
