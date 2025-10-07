// src/pages/Profile.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h2>Você precisa estar logado para acessar o perfil.</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Meu Perfil</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{user.displayName || "Usuário sem nome"}</h5>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Foto de perfil"
              className="img-thumbnail mt-3"
              style={{ maxWidth: "150px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
