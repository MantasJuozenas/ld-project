import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Wrapper from './components/Wrapper/Wrapper';
import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage';
import PageNotFound from './page/PageNotFound/PageNotFound';
import RegisterPage from './page/Register/RegisterPage';

function App() {
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
            <HomePage />
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
