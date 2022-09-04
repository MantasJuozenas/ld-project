import { Route, Switch } from 'react-router-dom';
import './App.css';
import Wrapper from './components/Wrapper/Wrapper';
import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage';

function App() {
  return (
    <Wrapper>
      <div className='App'>
        <Switch>
          <Route path={'/login'}>
            <LoginPage />
          </Route>
          <Route exact path={'/'}>
            <HomePage />
          </Route>
          <Route path='*'>
            <div className='container'>
              <h2>Page not found</h2>
            </div>
          </Route>
        </Switch>
      </div>
    </Wrapper>
  );
}

export default App;
