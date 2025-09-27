import React from 'react';
import {useAuth} from './contexts/AuthContext';
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Nav from './components/Nav/Nav';
import NavLogado from './components/Nav/NavLogado';
import Footer from './components/Footer/Footer';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import HomePage from './components/pages/HomePage';
// import HomePage from 'pages/HomePage';

// import ProfilePage from 'pages/ProfilePage';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {user ? <NavLogado /> : <Nav />}
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to='/login' />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
