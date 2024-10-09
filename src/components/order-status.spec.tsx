import { render } from "@testing-library/react";
import { OrderStatus } from "./order-status";
import { describe, it, expect } from "vitest";

describe("Order Status", () => {
  it("should display the right text based on order status", () => {
    const wrapper = render(<OrderStatus status="pending" />);


    const status = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");
    wrapper.debug();

    expect(status).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });
});
