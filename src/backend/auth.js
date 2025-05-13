// src/backend/auth.js
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Handle registration or login
  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Log in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("userEmail", user.email);
        navigate("/main");
      } else {
        // Register the user
        if (!name.trim()) {
          alert("Name is required for registration.");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("userEmail", user.email);
        
        // Add user to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: name.trim(),
          coursesCompleted: 0,
          points: 0,
          createdAt: new Date().toISOString()
        });

        navigate("/sidebar");
      }
    } catch (error) {
      alert("Authentication error: " + error.message);
    }
  };

  return (
    <div style={{ margin: "100px auto", textAlign: "center", width: "300px", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
      />
      <button onClick={handleAuth} style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>
        {isLogin ? "Login" : "Register"}
      </button>
      <p style={{ marginTop: "10px", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </p>
    </div>
  );
};
