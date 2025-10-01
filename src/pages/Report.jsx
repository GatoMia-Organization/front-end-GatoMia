// src/pages/Report.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Report() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((base64Images) => {
      setImagens((prev) => [...prev, ...base64Images]);
    });
  };

  const removeImage = (indexToRemove) => {
    setImagens((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "reports"), {
        nome,
        mensagem,
        imagens,
        createdAt: serverTimestamp(),
      });

      alert("✅ Denúncia enviada com sucesso!");
      setNome("");
      setMensagem("");
      setImagens([]);
    } catch (error) {
      console.error("Erro ao salvar denúncia:", error);
      alert("❌ Erro ao enviar denúncia!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Fazer Denúncia</h2>
            <form onSubmit={handleSubmit}>
              {/* Nome */}
              <div className="mb-3">
                <label className="form-label">Seu nome (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Mensagem */}
              <div className="mb-3">
                <label className="form-label">Mensagem</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Upload de imagens */}
              <div className="mb-3">
                <label className="form-label">Imagens (opcional)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              {/* Pré-visualização */}
              {imagens.length > 0 && (
                <div className="mb-3 text-center d-flex flex-wrap justify-content-center gap-2">
                  {imagens.map((img, index) => (
                    <div
                      key={index}
                      className="position-relative"
                      style={{ display: "inline-block" }}
                    >
                      <img
                        src={img}
                        alt={`Pré-visualização ${index + 1}`}
                        className="rounded shadow-sm"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        style={{
                          transform: "translate(30%, -30%)",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Botão */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Denúncia"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
