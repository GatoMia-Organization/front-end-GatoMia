import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User as FirebaseUser, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import axios from 'axios'; // Importamos o axios
import api from '../services/api'; // Importamos a instância do axios configurada
import { createUserWithEmailAndPassword } from 'firebase/auth';
// 1. ATUALIZE A INTERFACE AppUser PARA BATER COM A RESPOSTA DA SUA API
interface AppUser {
  uid: string;
  email: string | null;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  phone?: string;
  isActive: boolean;
}
type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone?: string;
}


interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const apiResponse = await axios.post('http://localhost:5223/api/users', { // Use a URL da sua API
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // A apiResponse.data deve ter o formato { name: 'Gato Mia', role: 'admin', ... }
          const profileData = apiResponse.data;
          
          // 4. Combinamos os dados do Firebase Auth com os dados da nossa API
          const enrichedUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: profileData.name,
            role: profileData.role,
            phone: profileData.phone,
            isActive: profileData.isActive
          };

          setUser(enrichedUser);

        } catch (error) {
          console.error("Erro ao buscar perfil do usuário na API:", error);
          // Ocorreu um erro (ex: API fora do ar, token inválido).
          // Deslogamos o usuário por segurança.
          setUser(null);
          signOut(auth); // Limpa a sessão do Firebase
        }
        // --- FIM DA MODIFICAÇÃO ---
      } else {
        // Usuário está deslogado
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    // O onAuthStateChanged vai detectar o login e rodar a lógica acima automaticamente!
  };

  const logout = async () => {
    await signOut(auth);
    // O onAuthStateChanged vai detectar o logout e setar o user para null.
  };
  const register = async (data: RegisterData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();

    const profileData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    };
    await api.post('/api/users', profileData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  };

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};