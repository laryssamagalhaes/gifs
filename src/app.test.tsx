import React from "react";
import { render, act } from "@testing-library/react";
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/dom";
import apiData from "./__fixtures__/api-data";

import App from "./App";

export const mockFetch = (response: any = []) => {
  global.fetch = jest.fn(() =>
    Promise.resolve(({
      json: () => Promise.resolve(response),
    } as unknown) as Promise<Response>)
  );
};

describe("<App />", () => {
  it("it should render the loading status", () => {
    render(<App />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("it should render the empty status", async () => {
    mockFetch({ data: [] });

    await act(async () => {
      await render(<App />);
      const loading = screen.getByTestId("loading");
      const emptyMessage = /No GIFs found for/;

      expect(loading).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();

      await waitFor(() => screen.getByText(emptyMessage));
      expect(screen.getByText(emptyMessage)).toBeInTheDocument();
    });
  });

  it("it should render the hasData status", async () => {
    mockFetch(apiData);

    await act(async () => {
      await render(<App />);
      const loading = screen.getByTestId("loading");

      expect(loading).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.getByTestId("loading"));

      expect(screen.getAllByTestId("gif-container").length).toEqual(
        apiData.data.length
      );
    });
  });

  it("should copy image url", async () => {
    mockFetch(apiData);

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, "writeText");

    await act(async () => {
      await render(<App />);

      await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
    });

    const image = screen.getAllByTestId("gif-container")[0];

    fireEvent.mouseOver(image);
    fireEvent.click(screen.getAllByTestId("copy-icon")[0]);

    expect(navigator.clipboard.writeText).toBeCalledWith(
      apiData.data[0].embed_url
    );
  });

  it("should search by term", async () => {
    mockFetch({ data: [] });

    await act(async () => {
      await render(<App />);
      const loading = screen.getByTestId("loading");
      const input = screen.getByTestId("search-input");
      const emptyMessage = /No GIFs found for/;

      expect(loading).toBeInTheDocument();
      expect(input).toBeInTheDocument();

      await waitFor(() => screen.getByText(emptyMessage));
      expect(screen.getByText(emptyMessage)).toBeInTheDocument();

      mockFetch({ data: [apiData.data[0]] });
      fireEvent.change(input, { target: { value: "dogs" } });
      await waitForElementToBeRemoved(() => screen.getByText(emptyMessage));
      await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
      expect(screen.getAllByTestId("gif-container").length).toEqual(1);
    });
  });
});
