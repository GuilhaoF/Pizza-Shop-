import { render } from "@testing-library/react";
import { Pagination } from "./pagination";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest"

const onPageChangeCallback = vi.fn();

describe("Pagination", () => {

  beforeAll(() => {
    onPageChangeCallback.mockClear();
  });

  it("should calculate the right amount of pages", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );
    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("should be able to navigate  to the next page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: "Próxima página",
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("should be able to navigate  to the previous page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={7}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: "Página anterior",
    });

    await user.click(nextPageButton);
    console.log(onPageChangeCallback.mock.calls);

    expect(onPageChangeCallback).toHaveBeenCalledWith(6); // 6 because the index is 0 based
  });


});
