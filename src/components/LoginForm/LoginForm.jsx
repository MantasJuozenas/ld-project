import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';

import * as Yup from 'yup';
import style from './LoginForm.module.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
import clock from '../../assets/clock.svg';

const initValues = {
  username: '',
  password: '',
};

function LoginForm() {
  const { login, isAdmin } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [active, setActive] = useState(true);

  function handleFocus() {
    setErrorMsg(false);
    setError(false);
  }

  function userFound(foundUser) {
    if (foundUser) {
      login(
        'GvpIRR31clX0uPlfLPJYI8/u2ZCqj1FSSX30wGHLDE8mJAefgz1va6VLWleGPPYBpg2gI9aD6J0J8Zjy58O6KzrMuOP5VlRwUrXFk4W305qB8NNoWcKh'
      );
      history.push('/');
    }
    setError(true);
    setErrorMsg('Neteisingi prisijungimo duomenys');
  }

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const resp = await fetch('https://testapi.io/api/Mantas/resource/LDtestapi', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await resp.json();

      // I used GET method to fetch the user results and compare them with input text because this api doesn't have POST method for login, only to add new users to db.
      result.data.forEach((user) => {
        if (user.username === values.username && user.password === values.password) {
          if (user.username === 'admin') {
            isAdmin(user);
          }
          userFound(true);
          return;
        }
        userFound(false);
      });
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Šis laukas yra privalomas')
        .min(4, 'Vartotojo vardas turėtų būti ne trumpesnis nei 4 skaitmenys'),
      password: Yup.string()
        .required('Šis laukas yra privalomas')
        .min(5, 'Slaptažodis turėtų būti ne trumpesnis nei 5 skaitmenys')
        .max(10, 'Slaptažodis turėtų būti ne ilgesnis nei 10 skaitmenų'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <div>
        <p className={style.loginTitle}>Susipažinkime</p>
        <nav>
          <NavLink className={`${style.navLink} ${active ? style.active : ''}`} to='/login'>
            Prisijungti
          </NavLink>
          <NavLink className={style.navLinkReg} to='/register' onClick={() => setActive(false)}>
            Registruotis
          </NavLink>
        </nav>
        <div className={style.inputContainer}>
          <input
            className={formik.touched.username && formik.errors.username ? `${style.errorInput}` : ''}
            type='text'
            placeholder='Vartotojo vardas (pvz Jonas)'
            name='username'
            onChange={formik.handleChange}
            onFocus={handleFocus}
            value={formik.values.username}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className={style.errorMsg}>{errorMsg || formik.errors.username}</p>
          ) : (
            <p className={`${style.padding} ${style.errorMsg}`}>{errorMsg ? errorMsg : error ? error : ''}</p>
          )}
        </div>
        <div className={style.inputContainer}>
          <input
            className={formik.touched.password && formik.errors.password ? `${style.errorInput}` : ''}
            name='password'
            type='password'
            placeholder='Jūsų slaptažodis'
            onChange={formik.handleChange}
            value={formik.values.password}
            onFocus={handleFocus}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className={style.errorMsg}>{errorMsg || formik.errors.password}</p>
          ) : (
            <p className={`${style.padding} ${style.errorMsg}`}>{errorMsg ? errorMsg : error ? error : ''}</p>
          )}
        </div>
        <button type='submit'>Prisijungti</button>
      </div>
      <div>
        <div className={style.message}>
          <p>Prašome prisijungti įrašant vartotojo vardą ir slaptažodį</p>
        </div>
        <img className={style.clock} src={clock} alt='clock' />
      </div>
    </form>
  );
}

export default LoginForm;
