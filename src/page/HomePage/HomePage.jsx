import React, { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';

function HomePage() {
  const { admin } = useContext(AuthContext);
  console.log(admin);
  return <div>HomePage</div>;
}

export default HomePage;
