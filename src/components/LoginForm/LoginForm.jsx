import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';

import * as Yup from 'yup';
import style from './LoginForm.module.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
import clock from '../../assets/clock.svg';
import Container from '../Container/Container';
import Input from '../Input';
import Button from '../Button';
import MessageDiv from '../MessageDiv';
import Paragraph from '../Paragraph';
import InputContainer from '../InputContainer';

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
    <Container>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <div>
          <Paragraph className={style.loginTitle} text={'Susipažinkime'} />
          <nav>
            <NavLink className={`${style.navLink} ${active ? style.active : ''}`} to='/login'>
              Prisijungti
            </NavLink>
            <NavLink className={style.navLinkReg} to='/register' onClick={() => setActive(false)}>
              Registruotis
            </NavLink>
          </nav>
          <InputContainer className={style.inputContainer}>
            <Input
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
              <Paragraph className={style.errorMsg} text={errorMsg || formik.errors.username} />
            ) : (
              <Paragraph
                className={`${style.padding} ${style.errorMsg}`}
                text={errorMsg ? errorMsg : error ? error : ''}
              />
            )}
          </InputContainer>
          <InputContainer className={style.inputContainer}>
            <Input
              className={formik.touched.password && formik.errors.password ? `${style.errorInput}` : ''}
              type='password'
              placeholder='Jūsų slaptažodis'
              name='password'
              onChange={formik.handleChange}
              onFocus={handleFocus}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <Paragraph className={style.errorMsg} text={errorMsg || formik.errors.password} />
            ) : (
              <Paragraph
                className={`${style.padding} ${style.errorMsg}`}
                text={errorMsg ? errorMsg : error ? error : ''}
              />
            )}
          </InputContainer>
          <Button type='submit' text='Prisijungti' />
        </div>
        <MessageDiv
          classNameDiv={style.message}
          classNameImg={style.clock}
          src={clock}
          text={'Prašome prisijungti įrašant vartotojo vardą ir slaptažodį'}
        />
      </form>
    </Container>
  );
}

export default LoginForm;
