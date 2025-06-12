import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
    const [myBlogs, setMyBlogs] = useState([]);
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("role") === "admin";
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/BlogPosts/myblogs", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setMyBlogs(data))
            .catch(err => console.error("Error loading user blogs:", err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            const res = await fetch(`/api/BlogPosts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                setMyBlogs(prev => prev.filter(blog => blog.id !== id));
            } else {
                alert("Failed to delete blog.");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#fff" }}>My Blogs</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {myBlogs.map(blog => (
                    <div key={blog.id} style={cardStyle}>
                        <h3>{blog.title}</h3>
                        <p><strong>Category:</strong> {blog.category}</p>
                        <p>{blog.description.slice(0, 100)}...</p>
                        <p><strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
                        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                            <button
                                style={buttonStyle.edit}
                                onClick={() => navigate(`/edit/${blog.id}`)}
                            >
                                Edit
                            </button>
                            <button
                                style={buttonStyle.delete}
                                onClick={() => handleDelete(blog.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: "15px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
};

const buttonStyle = {
    edit: {
        backgroundColor: "#4b6cb7",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer"
    },
    delete: {
        backgroundColor: "#d9534f",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer"
    }
};

export default MyBlogs;
