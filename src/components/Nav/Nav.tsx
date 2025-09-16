import React from "react";
import { Link } from 'react-router-dom';
import './Nav.css';


interface NavProps{

}

const Nav: React.FC<NavProps> = () =>{
    return (
        <nav className="nav-container">
      {/* Container do logo e nome */}
      <div className="logo-title-container">
        <Link to="/">
          <img src="/img/LogoGatoMia.png" alt="Logo Gato Mia" className="logo" />
        </Link>
      </div>
    {/* Links de navegação */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/contatos">Contatos</Link></li>
        <li><Link to="/denuncie">Denuncie</Link></li>
      </ul>
      
      {/* Botões de ação */}
      <div className="nav-buttons">
        <Link to="/entrar" className="btn btn-entrar">Entrar</Link>
        <Link to="/cadastrar" className="btn btn-cadastrar">Cadastrar</Link>
      </div>
    </nav>
    );
};
export default Nav;
