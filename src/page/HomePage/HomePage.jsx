import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { AuthContext } from '../../store/AuthContext';
import style from './HomePage.module.scss';

function HomePage() {
  const { admin, logout } = useContext(AuthContext);
  const adminInfo = localStorage.getItem('adminUser');

  return (
    <Container>
      <div className={style.homeContainer}>
        <h1>Home Page</h1>
        {admin ? (
          <>
            <div className={style.infoDiv}>
              <h2 className={style.title}>User info</h2>
              <h3 className={style.username}>
                Logged in as: <span className={style.purple}>{adminInfo.split(' ')[0]}</span>
              </h3>
              <p className={style.userInfo}>
                Admin user was created at: <span className={style.purple}>{adminInfo.split(' ')[1].split('T')[0]}</span>
                .
                <br /> Admin user id: <span className={style.purple}>{adminInfo.split(' ')[2]}</span>
              </p>
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
