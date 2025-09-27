import React from 'react';
import { Link } from 'react-router-dom'; // Para criar links de navegação
import { useAuth } from '../../contexts/AuthContext'; // Importa o hook useAuth
import './HomePage.css';

const HomePage: React.FC = () => {
  const { user } = useAuth(); // Pega o usuário do nosso contexto

  return (
    <div className="homepage-container">
      {/* Seção Principal (Hero) */}
      <section className="hero-section">
        <div className="hero-content">
          {user ? (
            // Mensagem para usuário LOGADO
            <h1>Bem-vindo(a) de volta, {user.name}!</h1>
          ) : (
            // Mensagem para VISITANTE
            <h1>Bem-vindo(a) ao Gato Mia</h1>
          )}
          <p className="subtitle">
            Sua plataforma segura e confiável para conectar, informar e proteger nossa comunidade.
          </p>
          {user ? (
            // Botão para usuário LOGADO
            <Link to="/perfil" className="cta-button">
              Ver Meu Perfil
            </Link>
          ) : (
            // Botão para VISITANTE
            <Link to="/cadastro" className="cta-button">
              Crie sua Conta Gratuitamente
            </Link>
          )}
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="features-section">
        <h2>Como Podemos Ajudar</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i> {/* Ícone do Font Awesome */}
            <h3>Denuncie com Segurança</h3>
            <p>Um canal seguro e anônimo para relatar incidentes e garantir a tranquilidade de todos.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-users"></i> {/* Ícone do Font Awesome */}
            <h3>Comunidade Ativa</h3>
            <p>Conecte-se com vizinhos, compartilhe informações importantes e fortaleça sua rede local.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-bullhorn"></i> {/* Ícone do Font Awesome */}
            <h3>Alertas em Tempo Real</h3>
            <p>Receba notificações sobre eventos importantes na sua área para se manter sempre informado.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;