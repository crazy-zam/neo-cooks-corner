import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styles from './app.module.less';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import Modal from 'react-modal';
import NavBar from './components/NavBar/NavBar';
import { useState } from 'react';
import Main from './pages/Main/Main';
import ChefDetailed from './pages/ChefDetailed/ChefDetailed';
import MyProfile from './pages/MyProfile/MyProfile';
import Search from './pages/Search/Search';
Modal.setAppElement('#root');
function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);
  return (
    <div className={styles.app}>
      {isAuth ? (
        <>
          <NavBar />
          <div></div>
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/chef-details/:id" element={<ChefDetailed />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Navigate to="/main" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/registration" element={<Register />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
