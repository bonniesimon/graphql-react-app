import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import Posts from "../Posts";
import postsQueries from "../../api/graphql/queries/posts";

describe("Posts index", () => {
  const mockPosts = [
    {
      id: "1",
      title: "Linux mint is the jit",
      rating: 8,
      __typename: "Post",
    },
    {
      id: "2",
      title: "PopOS didn't excite me that much",
      rating: 6,
      __typename: "Post",
    },
  ];

  const mocks = [
    {
      request: {
        query: postsQueries.list(),
      },
      result: {
        data: {
          posts: mockPosts,
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

  it("renders loading indicator when fetching data", () => {
    renderComponent(<Posts />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
