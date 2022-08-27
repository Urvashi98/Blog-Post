import "./App.css";
import PostDetailedInfo from "./components/PostDetailedInfo";
import Posts from "./components/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetailedInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
