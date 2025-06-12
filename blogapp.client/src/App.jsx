import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import ViewBlog from "./pages/ViewBlog.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RequireAuth from "./utils/RequireAuth";
import MyBlogs from "./pages/MyBlogs";


function App() {
    return (
        <Router>
            <Navbar />
            <div
                className="container"
                style={{
                    width: "100vw",
                    margin: "80px auto 0 auto",
                    padding: "1.5%",
                    boxSizing: "border-box",
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddBlog />} />
                    <Route path="/edit/:id" element={<EditBlog />} />
                    <Route path="/view/:id" element={<ViewBlog />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/add" element=
                        {
                            <RequireAuth>
                                <AddBlog />
                            </RequireAuth>
                        } />
                    <Route
                        path="/view/:id"
                        element={
                            <RequireAuth>
                                <ViewBlog />
                            </RequireAuth>
                        } />
                    <Route path="/myblogs" element={<MyBlogs />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
