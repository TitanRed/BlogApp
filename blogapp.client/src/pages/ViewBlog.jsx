import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/BlogPosts/${id}`);
                if (!response.ok) throw new Error("Blog not found");
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;
    if (!blog) return <div style={styles.error}>Blog not found.</div>;

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>{blog.title}</h2>
                <p style={styles.meta}>
                    <strong>Author:</strong> {blog.author} &nbsp;|&nbsp;
                    <strong>Category:</strong> {blog.category} &nbsp;|&nbsp;
                    <strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}
                </p>
                <hr style={styles.hr} />
                <p style={styles.description}>{blog.description}</p>
            </div>
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
        padding: "30px",
        backgroundColor: "#lelele",
        boxSizing: "border-box",
    },
    card: {
        backgroundColor: "#lelele",
        color: "#fff",
        padding: "25px",
        borderRadius: "10px",
        maxWidth: "700px",
        width: "100%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "10px",
    },
    meta: {
        color: "#bbbbbb",
        marginBottom: "15px",
        fontSize: "0.95rem",
    },
    hr: {
        border: "none",
        borderBottom: "1px solid #444",
        marginBottom: "15px",
    },
    description: {
        fontSize: "1.1rem",
        lineHeight: "1.6",
    },
    loading: {
        color: "#ccc",
        padding: "40px",
        fontSize: "1.2rem",
    },
    error: {
        color: "red",
        padding: "40px",
        fontSize: "1.2rem",
    }
};

export default ViewBlog;
