import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Posts from "./components/Posts";
import PostsShow from "./components/Posts/Show";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<PostsShow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
