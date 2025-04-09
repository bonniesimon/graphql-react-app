import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Posts from "./components/Posts";
import PostsShow from "./components/Posts/Show";
import New from "./components/Comments/New";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<PostsShow />} />
        <Route path="/posts/:id/comments/new" element={<New />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
