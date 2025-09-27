import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email,  setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Inverte o valor atual (true vira false, e vice-versa)
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return; 
    }
    try {
      await register({ name, email, password});
      alert('Cadastro realizado com sucesso! Faça o login para continuar.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Falha ao cadastrar. O email já pode estar em uso.');
    }
    
  };

  return (
    <div className="login-page-background">
      <div className="login-card">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className ="password-input-wrapper">
              <input 
              type="{isPasswordVisible ? 'text' : 'password'}" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              <i 
                // A classe do ícone também é dinâmica
                className={`fas ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
                onClick={togglePasswordVisibility} // A função é chamada no clique
              ></i>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
          </div>
          <button onClick={handleSubmit} type="submit" className="auth-button">Cadastrar</button>
        </form>
      </div>
    </div>
    );
};

export default RegisterPage;