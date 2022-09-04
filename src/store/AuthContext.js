import { createContext, useState } from 'react';

export const AuthContext = createContext({
  login() {},
  logout() {},
  isAdmin() {},
  isUserLoggedIn: false,
  admin: false,
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [admin, setAdmin] = useState(false);

  function isAdmin() {
    setAdmin(true);
  }

  const isUserLoggedIn = !!token;

  function login(userToken) {
    setToken(userToken);
    localStorage.setItem('userToken', userToken);
  }
  function logout() {
    setToken(null);
    setAdmin(false);
    localStorage.removeItem('userToken');
  }

  const ctx = {
    login,
    logout,
    isUserLoggedIn,
    token,
    isAdmin,
    admin,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
