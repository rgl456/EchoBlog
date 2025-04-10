import { Link, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import CreateCategory from './components/CreateCategory';
import CreateTag from './components/CreateTag';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import DraftPosts from './components/DraftPosts';
import UpdatePost from './components/UpdatePost';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <CreateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tag"
          element={
            <ProtectedRoute>
              <CreateTag />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drafts"
          element={
            <ProtectedRoute>
              <DraftPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updatepost"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Link to="/createpost" className="floating-create-post-btn">
        +
      </Link>
    </>
  );
}

export default App;
