import "./App.css";
import PostDetailedInfo from "./components/PostDetailedInfo";
import Posts from "./components/Posts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import UpdatePost from "./components/UpdatePost";
import Signup from "./components/Signup";
import Login from "./components/Login";
const element = <h1>No such page found!</h1>;
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/create_post" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
          {/* below path redirect the default path to any other path */}
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts/:id" element={<PostDetailedInfo />} />
          <Route path="/update_post/:id" element={<UpdatePost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={element} /> // to be updated
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
