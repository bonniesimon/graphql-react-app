import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import commentsQueries from "../../api/graphql/queries/comments";
import New from "./New";
import postsQueries from "../../api/graphql/queries/posts";
import Show from "../Posts/Show";

describe("Comments New", () => {
  const mockPost = {
    __typename: "Post",
    id: 1,
    title: "Test Post Title",
    rating: 4.5,
    comments: [
      { __typename: "Comment", id: "c1", body: "This is comment one." },
      { __typename: "Comment", id: "c2", body: "Another great comment!" },
    ],
  };

  const mockCommentCreateResult = {
    data: {
      commentCreate: {
        comment: {
          id: "17",
          body: "I like this UI",
          __typename: "Comment",
        },
      },
    },
  };

  const mocks = [
    {
      request: {
        query: commentsQueries.create(),
        variables: { body: "I like this UI", postId: "1" },
      },
      result: mockCommentCreateResult,
    },
    {
      request: {
        query: postsQueries.show(mockPost.id),
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
        <MemoryRouter initialEntries={["/posts/1/comments/new"]}>
          <Routes>
            <Route path="/posts/:id" element={<Show />} />
            <Route path="/posts/:id/comments/new" element={component} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  };

  it("renders the New component", () => {
    renderComponent(<New />);

    expect(screen.getByText("Save Comment")).toBeInTheDocument();
  });

  it("creates a new comment and redirects to post show page", async () => {
    renderComponent(<New />);

    const input = screen.getByLabelText("Body");

    fireEvent.change(input, { target: { value: "I like this UI" } });

    const submitButton = screen.getByText("Save Comment");
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText(mockPost.title));
    expect(screen.getByText(`Rating: ${mockPost.rating}`)).toBeInTheDocument();
  });
});
