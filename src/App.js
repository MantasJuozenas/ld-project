import { useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Wrapper from './components/Wrapper/Wrapper';
import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage';
import PageNotFound from './page/PageNotFound/PageNotFound';
import RegisterPage from './page/Register/RegisterPage';
import { AuthContext } from './store/AuthContext';

function App() {
  const { token } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Wrapper>
      <div className='App'>
        <Switch>
          <Route path={'/login'}>
            <LoginPage />
          </Route>
          <Route path={'/register'}>
            <RegisterPage />
          </Route>
          <ProtectedRoute exact path={'/'}>
            {token ? <HomePage /> : history.push('/login')}
          </ProtectedRoute>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Wrapper>
  );
}

export default App;
