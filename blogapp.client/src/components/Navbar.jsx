import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const isAdmin = localStorage.getItem("role") === "admin";
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };
    const handleBecomeAdmin = async () => {
        const confirmed = window.confirm("Are you sure you want to become an admin?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("/api/auth/become-admin", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("You are now an admin!");
                localStorage.setItem("role", "admin");
                localStorage.setItem("username", "admin");
                window.location.reload();
            } else {
                alert("Failed to become admin");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logoSection}>
                <h2 style={styles.logo}>BlogApp</h2>
            </div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                {isLoggedIn && <Link to="/add" style={styles.link}>Add Blog</Link>}

                {!isLoggedIn && (
                    <>
                        <Link to="/login" style={{ ...styles.link}}>Login</Link>
                        <Link to="/register" style={{ ...styles.link}}>Register</Link>
                    </>
                )}
                {isLoggedIn && (
                    <Link to="#" style={styles.link} onClick={handleBecomeAdmin}>
                        Become Admin
                    </Link>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/myblogs" style={styles.link}>My Blogs</Link>
                    </>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                )}
            </div>
        </nav>
    );

};

const styles = {
    nav: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "12px 24px",
        backgroundColor: "#282c34",
        color: "#fff",
        gap: "12px",
        boxSizing: "border-box",
    },
    logoSection: {
        flex: "1 1 auto",
    },
    logo: {
        margin: 0,
        fontSize: "1.5rem",
    },
    links: {
        display: "flex",
        gap: "16px",
        flex: "0 0 auto",
        alignItems: "center",
    },
    link: {
        color: "#61dafb",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "500",
    },
    logoutButton: {
        backgroundColor: "transparent",
        border: "none",
        color: "#61dafb",
        fontSize: "1rem",
        fontWeight: "500",
        cursor: "pointer",
    }
};

export default Navbar;
