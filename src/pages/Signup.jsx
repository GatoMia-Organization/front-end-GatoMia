import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("Erro signup:", err); // debug
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error("Erro Google signup:", err); // debug
      setError("Erro ao criar conta com Google.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Cadastro</h2>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSignup}
        className="mx-auto p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100 mb-3">
          Cadastrar
        </button>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="btn btn-outline-danger w-100"
        >
          <i className="bi bi-google me-2"></i> Cadastrar com Google
        </button>
      </form>
    </div>
  );
}
