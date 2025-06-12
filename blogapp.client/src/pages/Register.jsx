import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });

            if (!response.ok) throw new Error("Registration failed");

            alert("Registered successfully! You can now log in.");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleRegister} style={styles.form}>
                <h2 style={styles.heading}>Register</h2>

                {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

                <label style={styles.label}>Username</label> {/* NEW */}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a password"
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Register</button>
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
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#lelele",
        boxSizing: "border-box",
    },
    form: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        borderRadius: "10px",
        padding: "30px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    heading: {
        textAlign: "center",
        marginBottom: "10px",
    },
    label: {
        color: "#dddddd",
    },
    input: {
        padding: "10px",
        backgroundColor: "#2a2a2a",
        color: "#ffffff",
        border: "1px solid #444",
        borderRadius: "5px",
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

export default Register;
