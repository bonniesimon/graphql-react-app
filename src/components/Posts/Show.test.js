import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import Show from "./Show";
import postsQueries from "../../api/graphql/queries/posts";

describe("Show Component", () => {
  const mockPostId = "1";
  const mockPost = {
    __typename: "Post",
    id: mockPostId,
    title: "Test Post Title",
    rating: 4.5,
    comments: [
      { __typename: "Comment", id: "c1", body: "This is comment one." },
      { __typename: "Comment", id: "c2", body: "Another great comment!" },
    ],
  };

  const mocks = [
    {
      request: {
        query: postsQueries.show(mockPostId),
      },
      result: {
        data: {
          post: mockPost,
        },
      },
    },
  ];

  it("renders a loading indicator while fetching data", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/posts/${mockPostId}`]}>
          <Routes>
            <Route path="/posts/:id" element={<Show />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
