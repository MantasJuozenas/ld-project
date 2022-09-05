import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import style from '../LoginForm/LoginForm.module.scss';
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
  repPassword: '',
};

function RegisterForm() {
  const [error, setError] = useState(false);
  const [active, setActive] = useState(true);
  const [register, setRegister] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newLogin = {
        username: values.username,
        password: values.password,
      };
      const resp = await fetch('https://testapi.io/api/Mantas/resource/LDtestapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogin),
      });
      const result = await resp.json();
      if (result.createdAt) {
        setRegister(true);
      }
      setError(result.err);
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Šis laukas negali būti tuščias')
        .min(4, 'Vartotojo vardas turėtų būti ne trumpesnis nei 4 skaitmenys'),
      password: Yup.string()
        .required('Šis laukas negali būti tuščias')
        .min(5, 'Slaptažodis turėtų būti ne mažiau 5 skaitmenų')
        .max(10, 'Slaptažodis turėtų būti ne daugiau 10 skaitmenų'),
      repPassword: Yup.string()
        .required('Šis laukas negali būti tuščias')
        .oneOf([Yup.ref('password'), null], 'Slaptažodžiai turi sutapti'),
    }),
  });

  return (
    <Container>
      {register ? (
        <div className={style.successMessage}>
          <Paragraph text={'Jūsų registracija buvo sėkminga, galite prisijungti čia'} />
          <Link className={style.navLink} to={'/login'}>
            <Button text={'Prisijungti'} />
          </Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <div>
            <Paragraph className={style.loginTitle} text={'Susipažinkime'} />
            <nav>
              <NavLink className={style.navLink} to='/login'>
                Prisijungti
              </NavLink>
              <NavLink
                className={`${style.navLinkReg} ${active ? style.active : ''}`}
                to='/register'
                onClick={() => setActive(false)}
              >
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
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <Paragraph className={style.errorMsg} text={formik.errors.username} />
              ) : (
                <Paragraph className={`${style.padding} ${style.errorMsg}`} text={error ? error : ''} />
              )}
            </InputContainer>
            <InputContainer className={style.inputContainer}>
              <Input
                className={formik.touched.password && formik.errors.password ? `${style.errorInput}` : ''}
                type='password'
                placeholder='Jūsų slaptažodis'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <Paragraph className={style.errorMsg} text={formik.errors.password} />
              ) : (
                <Paragraph className={`${style.padding} ${style.errorMsg}`} text={error ? error : ''} />
              )}
            </InputContainer>
            <InputContainer className={style.inputContainer}>
              <Input
                className={formik.touched.repPassword && formik.errors.repPassword && `${style.errorInput}`}
                type='password'
                placeholder='Pakartoti slaptažodį'
                name='repPassword'
                onChange={formik.handleChange}
                value={formik.values.repPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.repPassword && formik.errors.repPassword ? (
                <Paragraph className={style.errorMsg} text={formik.errors.repPassword} />
              ) : (
                <Paragraph className={`${style.padding} ${style.errorMsg}`} text={error ? error : ''} />
              )}
            </InputContainer>
            <Button type='submit' text='Registruotis' />
          </div>
          <MessageDiv
            classNameDiv={style.message}
            classNameImg={style.clock}
            src={clock}
            text={'Prašome prisiregistruoti įrašant naują vartotojo vardą, slaptažodį, bei jį pakartoti'}
          />
        </form>
      )}
    </Container>
  );
}

export default RegisterForm;
