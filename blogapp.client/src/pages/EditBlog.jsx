import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("General");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`/api/BlogPosts/${id}`);
            if (response.ok) {
                const blog = await response.json();
                setTitle(blog.title);
                setCategory(blog.category);
                setDescription(blog.description);
                setLoading(false);
            } else {
                alert("Failed to load blog post");
                navigate("/");
            }
        };

        fetchBlog();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const updatedBlog = {
            title,
            category,
            description
        };

        const response = await fetch(`/api/BlogPosts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedBlog)
        });

        if (response.ok) {
            alert("Blog updated successfully!");
            navigate("/myblogs");
        } else {
            alert("Failed to update blog.");
        }
    };

    if (loading) return <p style={{ color: "white" }}>Loading blog...</p>;

    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleUpdate} style={styles.form}>
                <h2 style={styles.heading}>Edit Blog</h2>

                <label style={styles.label}>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.input}
                >
                    <option>General</option>
                    <option>Technology</option>
                    <option>Education</option>
                    <option>Personal</option>
                    <option>Cooking</option>
                    <option>Fantasy</option>
                    <option>Sports</option>
                </select>

                <label style={styles.label}>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.textarea}
                    required
                />

                <button type="submit" style={styles.button}>Update</button>
            </form>
        </div>
    );
};

const styles = {
    wrapper: {
        width: "100vw",
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        backgroundColor: "#lelele",
        boxSizing: "border-box",
    },
    form: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        borderRadius: "10px",
        padding: "30px",
        width: "100vw",
        maxWidth: "600px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxSizing: "border-box",
    },
    heading: {
        marginBottom: "10px",
        fontSize: "1.5rem",
        textAlign: "center",
        color: "#ffffff",
    },
    label: {
        fontWeight: "600",
        color: "#dddddd",
    },
    input: {
        padding: "10px",
        backgroundColor: "#2a2a2a",
        color: "#ffffff",
        border: "1px solid #444",
        borderRadius: "5px",
        fontSize: "1rem",
    },
    textarea: {
        padding: "10px",
        backgroundColor: "#2a2a2a",
        color: "#ffffff",
        border: "1px solid #444",
        borderRadius: "5px",
        fontSize: "1rem",
        height: "120px",
        resize: "vertical",
    },
    button: {
        marginTop: "10px",
        padding: "12px",
        backgroundColor: "#4b6cb7",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};

export default EditBlog;
