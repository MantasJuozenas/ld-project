import { useContext } from 'react';
import { Route } from 'react-router';

import { Link } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import Button from './Button';
import style from './LoginForm/LoginForm.module.scss';
import Paragraph from './Paragraph';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const { children, ...rest } = props;

  return (
    <Route {...rest}>
      {isUserLoggedIn ? (
        children
      ) : (
        <div className={style.successMessage}>
          <Paragraph text={'Jūs nesate prisijungę, norėdami pamatyti daugiau prisijunkite!'} />
          <Link className={style.navLink} to={'/login'}>
            <Button text={'Prisijungti'} />
          </Link>
        </div>
      )}
    </Route>
  );
}

export default ProtectedRoute;
