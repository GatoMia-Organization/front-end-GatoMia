// src/pages/Contact.jsx
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-page bg-light py-5">
      <div className="container">
        {/* Título */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Entre em Contato</h2>
          <p className="text-muted">
            Estamos aqui para ouvir você. Fale conosco através do formulário ou
            dos canais abaixo.
          </p>
        </div>

        <div className="row g-4">
          {/* Informações de contato */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Informações</h5>
                <p>
                  <FaEnvelope className="me-2 text-primary" />
                  contato@gatomia.org
                </p>
                <p>
                  <FaPhoneAlt className="me-2 text-primary" />
                  (11) 1234-5678
                </p>
                <p>
                  <FaWhatsapp className="me-2 text-success" />
                  (11) 98765-4321
                </p>
                <p>
                  <FaInstagram className="me-2 text-danger" />
                  @gatomia
                </p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="col-md-7">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Envie sua mensagem</h5>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mensagem</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Escreva sua mensagem"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
