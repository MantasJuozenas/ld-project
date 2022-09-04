import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import style from '../LoginForm/LoginForm.module.scss';
import clock from '../../assets/clock.svg';

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
    <>
      {register ? (
        <div className={style.successMessage}>
          <p>Jūsų registracija buvo sėkminga, galite prisijungti čia</p>
          <Link className={style.navLink} to={'/login'}>
            <button>Prisijungti</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <div>
            <p className={style.loginTitle}>Susipažinkime</p>
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
            <div className={style.inputContainer}>
              <input
                className={formik.touched.username && formik.errors.username ? `${style.errorInput}` : ''}
                type='text'
                placeholder='Vartotojo vardas (pvz Jonas)'
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <p className={style.errorMsg}>{formik.errors.username}</p>
              ) : (
                <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
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
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className={style.errorMsg}>{formik.errors.password}</p>
              ) : (
                <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
              )}
            </div>
            <div className={style.inputContainer}>
              <input
                className={formik.touched.repPassword && formik.errors.repPassword && `${style.errorInput}`}
                type='password'
                name='repPassword'
                placeholder='Pakartoti slaptažodį'
                onChange={formik.handleChange}
                value={formik.values.repPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.repPassword && formik.errors.repPassword ? (
                <p className={style.errorMsg}>{formik.errors.repPassword}</p>
              ) : (
                <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
              )}
            </div>
            <button type='submit'>Registruotis</button>
          </div>
          <div>
            <div className={style.message}>
              <p>Prašome prisiregistruoti įrašant naują vartotojo vardą, slaptažodį, bei jį pakartoti</p>
            </div>
            <img className={style.clock} src={clock} alt='clock' />
          </div>
        </form>
      )}
    </>
  );
}

export default RegisterForm;
