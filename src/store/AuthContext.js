import { createContext, useState } from 'react';

export const AuthContext = createContext({
  login() {},
  logout() {},
  isAdmin() {},
  isUserLoggedIn: false,
  admin: false,
  user: '',
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [admin, setAdmin] = useState(false);

  function isAdmin(user) {
    localStorage.setItem('user', [user.username, user.createdAt, user.id]);
    setAdmin(true);
  }

  const isUserAdmin = !!localStorage.getItem('user');
  const isUserLoggedIn = !!token;

  function login(userToken) {
    setToken(userToken);
    localStorage.setItem('userToken', userToken);
  }
  function logout() {
    setToken(null);
    setAdmin(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  }

  const ctx = {
    login,
    logout,
    isUserLoggedIn,
    token,
    isAdmin,
    admin,
    isUserAdmin,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
