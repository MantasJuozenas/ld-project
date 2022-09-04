import React, { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';
import style from './HomePage.module.scss';

function HomePage() {
  const { admin } = useContext(AuthContext);
  console.log(admin);
  return <div>HomePage</div>;
}

export default HomePage;
