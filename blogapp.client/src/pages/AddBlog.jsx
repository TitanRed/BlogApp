import React, { useState } from "react";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("General");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const blogPost = {
            title,
            category,
            description,
            author,
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await fetch("/api/BlogPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(blogPost)
            });

            if (response.ok) {
                alert("Blog post submitted!");
                window.location.href = "/";
            } else {
                alert("Failed to submit blog.");
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
            alert("Error submitting blog.");
        }
    };

    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Create a New Blog Post</h2>
                <label style={styles.label}>Author</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter your name"
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Blog Title</label>
                <input
                    type="text"
                    placeholder="My Awesome Story"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Choose a category</label>
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

                <label style={styles.label}>Short Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A short description..."
                    style={styles.textarea}
                    required
                />

                <button type="submit" style={styles.button}>Send</button>
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

export default AddBlog;
