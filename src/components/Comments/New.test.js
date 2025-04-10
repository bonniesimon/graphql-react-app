import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import commentsQueries from "../../api/graphql/queries/comments";
import New from "./New";

describe("Comments New", () => {
  const mocks = [
    {
      request: {
        query: commentsQueries.create(),
      },
      result: {
        data: {
          // id: "17",
          body: "I like this UI",
          __typename: "Comment",
        },
      },
    },
  ];
  const renderComponent = (component) => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={component} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  };

  it("renders the New component", () => {
    renderComponent(<New />);

    expect(screen.getByText("Save Comment")).toBeInTheDocument();
  });
});
