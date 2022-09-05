import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Paragraph from '../../components/Paragraph';
import { AuthContext } from '../../store/AuthContext';
import style from './HomePage.module.scss';

function HomePage() {
  const { isUserAdmin, logout } = useContext(AuthContext);
  const user = localStorage.getItem('user');

  return (
    <Container>
      <div className={style.homeContainer}>
        <h1>Home Page</h1>
        {isUserAdmin ? (
          <>
            <div className={style.infoDiv}>
              <h2 className={style.title}>User info</h2>
              <h3 className={style.username}>
                Logged in as: <span className={style.purple}>{user ? user.split(',')[0] : ''}</span>
              </h3>
              <Paragraph
                className={style.userInfo}
                text={[
                  'Admin user was created at: ',
                  <span className={style.purple}>{user ? user.split(',')[1].split('T')[0] : ''}</span>,
                ]}
              />
              <Paragraph
                className={style.userInfo}
                text={['Admin user id: ', <span className={style.purple}>{user ? user.split(',')[2] : ''}</span>]}
              />
            </div>
            <div className={style.logoutDiv}>
              <NavLink onClick={logout} className={`${style.navLink} ${style.active}`} to='/login'>
                Atsijungti
              </NavLink>
            </div>
          </>
        ) : (
          <div className={`${style.infoDiv} ${style.span2}`}>
            <h2 className={style.title}>Welcome! This website is still in progress, more content is coming soon!</h2>
            <NavLink onClick={logout} className={`${style.navLink} ${style.active}`} to='/login'>
              Atsijungti
            </NavLink>
          </div>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
