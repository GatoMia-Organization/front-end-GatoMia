import React from 'react';
import './Footer.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer: React.FC = () => {
  return (
    <footer className="footer-principal">
        <div className="footer-container">
            <div className = "social-icons">
                <a  href = "" target="_blank" rel="noopener noreferrer" aria-label='WhatsApp'>
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a href = "" target ="_blank" rel="noopener noreferrer" aria-label='LinkedIn'>
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href = "" target ="_blank" rel="noopener noreferrer" aria-label='Instagram'>
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </div>
            <div className="copyright-text">
                <p>&copy; {new Date().getFullYear()} Gato Mia - Todos os direitos reservados</p>
            </div>
            <div className="footer-spacer"></div>
        </div>
    </footer>
  );
};

export default Footer;
