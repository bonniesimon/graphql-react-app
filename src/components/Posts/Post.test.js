import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Post from "./Post";

describe("Post Component", () => {
  const mockPost = {
    id: 1,
    title: "Test Post Title",
    rating: 4.5,
  };

  it("renders the post title and rating", () => {
    render(
      <BrowserRouter>
        <Post post={mockPost} />
      </BrowserRouter>
    );

    const titleElement = screen.getByText(mockPost.title);
    expect(titleElement).toBeInTheDocument();

    const ratingElement = screen.getByText(`Rating: ${mockPost.rating}`);
    expect(ratingElement).toBeInTheDocument();
  });

  it("links to the correct post detail page", () => {
    render(
      <BrowserRouter>
        <Post post={mockPost} />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link", { name: mockPost.title });

    expect(linkElement).toHaveAttribute("href", `/posts/${mockPost.id}`);
  });
});
