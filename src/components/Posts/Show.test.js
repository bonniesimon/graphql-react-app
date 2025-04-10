import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
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

  const renderComponent = (component) => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/posts/${mockPostId}`]}>
          <Routes>
            <Route path="/posts/:id" element={component} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  };

  it("renders a loading indicator while fetching data", () => {
    renderComponent(<Show />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays post details after data is loaded", async () => {
    renderComponent(<Show />);

    await waitFor(() => screen.getByText(mockPost.title));

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${mockPost.rating}`)).toBeInTheDocument();

    mockPost.comments.forEach((comment) => {
      expect(screen.getByText(comment.body)).toBeInTheDocument();
    });
  });

  it('navigates to the "Add Coment" page when the button is clicked', async () => {
    renderComponent(<Show />);

    await waitFor(() => screen.getByText(mockPost.title));

    expect(screen.getByText("Add Comment")).toBeInTheDocument();

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/posts/${mockPostId}/comments/new`
    );
  });
});
