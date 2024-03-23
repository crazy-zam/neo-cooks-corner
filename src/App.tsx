import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './app.module.less';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Modal from 'react-modal';
import NavBar from './components/NavBar/NavBar';
import Main from './pages/Main/Main';
import ChefDetailed from './pages/ChefDetailed/ChefDetailed';
import MyProfile from './pages/MyProfile/MyProfile';
import Search from './pages/Search/Search';
import { observer } from 'mobx-react-lite';
import userStore from './store/userStore';
import DishDetailed from './pages/DishDetailed/DishDetailed';
import { Scrollbar } from 'react-scrollbars-custom';
import EmailValidate from './pages/EmailValidate/EmailValidate';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';
Modal.setAppElement('#root');
const App = observer(() => {
  return (
    <div className={styles.app}>
      {userStore.isAuth ? (
        <>
          <NavBar />
          <div></div>
          <Scrollbar
            disableTracksWidthCompensation
            style={{ width: `100%`, height: '100vh' }}
            thumbYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return (
                  <div
                    {...restProps}
                    ref={elementRef}
                    className={styles.tHuMbY}
                  />
                );
              },
            }}
            trackYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return (
                  <span
                    {...restProps}
                    ref={elementRef}
                    className={styles.trackY}
                  />
                );
              },
            }}
          >
            <Routes>
              <Route path="/main" element={<Main />} />
              <Route path="/chef-details/:slug" element={<ChefDetailed />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/recipe/:slug" element={<DishDetailed />} />
              <Route path="*" element={<Navigate to="/main" />} />
            </Routes>
          </Scrollbar>
        </>
      ) : (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/registration" element={<Register />} />
          <Route path="/auth/confirmation" element={<EmailValidate />} />
          <Route path="/auth/forgot" element={<ForgotPassword />} />
          <Route path="/auth/change-password" element={<ChangePassword />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      )}
    </div>
  );
});

export default App;
