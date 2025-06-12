import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "/";
        } catch (err) {
            console.error(err.message);
            alert(err.message);
        }
    };


    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleLogin} style={styles.form}>
                <h2 style={styles.heading}>Login</h2>

                {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

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
                    placeholder="Enter password"
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Login</button>
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

export default Login;
