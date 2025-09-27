import {useAuth} from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const NavLogado: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/perfil');
    }
    if(!user) {
        return null;
    }
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
        <button onClick={handleProfileClick} className="btn btn-perfil">
            Olá, {user.name}
        </button>
        <button onClick={logout} className="btn btn-sair">
            Sair
        </button>
      </div>
    </nav>
);
};

export default NavLogado;