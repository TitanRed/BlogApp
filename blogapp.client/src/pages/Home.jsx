import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState("none");
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        fetch("/api/BlogPosts")
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error("Failed to load blogs:", err));
    }, []);

    const applyFilter = (blogs) => {
        switch (filter) {
            case "author":
                return [...blogs].sort((a, b) => a.author.localeCompare(b.author));
            case "alphabetical":
                return [...blogs].sort((a, b) => a.title.localeCompare(b.title));
            case "length":
                return [...blogs].sort((a, b) => b.description.length - a.description.length);
            case "category":
                return [...blogs].sort((a, b) => a.category.localeCompare(b.category));
            default:
                return [...blogs].sort(() => Math.random() - 0.5);
        }
    };

    const handleReadMore = (id) => {
        if (!isLoggedIn) {
            alert("Please login to read the full blog post.");
            return;
        }
        navigate(`/view/${id}`);
    };

    const filteredBlogs = applyFilter(blogs);

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.heading}>All Blog Posts</h2>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={styles.dropdown}
            >
                <option value="none">Random</option>
                <option value="author">By Author</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="length">By Length</option>
                <option value="category">By Category</option>
            </select>

            <div style={styles.grid}>
                {filteredBlogs.map((blog) => (
                    <div key={blog.id} style={styles.card}>
                        <h3>{blog.title}</h3>
                        <p><strong>Author:</strong> {blog.author}</p>
                        <button onClick={() => handleReadMore(blog.id)} style={styles.button}>
                            Read More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        width: "90vw",
        padding: "10px",
        boxSizing: "border-box",
    },
    heading: {
        marginBottom: "20px",
    },
    dropdown: {
        marginBottom: "20px",
        padding: "10px",
        fontSize: "1rem",
        backgroundColor: "#2a2a2a",
        color: "#fff",
        border: "1px solid #444",
        borderRadius: "5px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
    },
    card: {
        backgroundColor: "#1f1f1f",
        color: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        boxSizing: "border-box",
        height: "100%",
    },
    button: {
        marginTop: "10px",
        padding: "8px 12px",
        backgroundColor: "#4b6cb7",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
};

export default Home;
