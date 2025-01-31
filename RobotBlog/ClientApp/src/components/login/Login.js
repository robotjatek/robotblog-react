import React, { useState, useGlobal } from 'reactn';
import './login.css';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginModalContent from './modal/login-modal/login-modal';
import RegisterModalContent from './modal/register-modal/register-modal';
import loginService from '../../services/login/login.service';
import alertService, { AlertType } from '../../services/alert/alert.service';
import PasswordResetModal from './modal/password-reset/password-reset-modal';

const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('login');
  const [globalState, setGlobalState] = useGlobal();
  const [t] = useTranslation();

  const loggedIn = () => globalState.loginResult != null;

  const onSignInClick = () => {
    setModalVisible(true);
    setModalType('login');
  };

  const onRegisterClick = () => {
    setModalVisible(true);
    setModalType('register');
  };

  const onResetClick = () => {
    setModalVisible(true);
    setModalType('reset');
  };

  const onLogoutClick = () => {
    setGlobalState({ loginResult: null });
  };

  const onLoginAccept = async (email, password) => {
    const result = await loginService.Login(email, password);
    switch (result.status) {
      case 200:
        setGlobalState({ loginResult: result.data });
        setModalVisible(false);
        break;
      case 401:
        alertService.showAlert(t('login.401'), AlertType.DANGER, 5000);
        break;
      case 403:
        alertService.showAlert(t('login.403'), AlertType.DANGER, 5000);
        break;
      default:
        alertService.showAlert(t('login.failed'), AlertType.DANGER, 5000);
        break;
    }
  };

  const onRegisterAccept = async (email, password, username, language) => {
    const result = await loginService.Register(email, password, username, language);
    if (result) {
      setModalVisible(false);
    } else {
      alertService.showAlert(t('login.registration-failed'), AlertType.DANGER, 5000);
    }
  };

  const onResetAccept = async (email) => {
    const result = await loginService.Reset(email);
    if (result.status >= 200 && result.status < 300) {
      alertService.showAlert(t('login.reset-email-sent'), AlertType.INFO, 5000);
    } else {
      alertService.showAlert(t('login.reset-unkown-account'), AlertType.DANGER, 5000);
    }
  };

  const getModal = () => {
    switch (modalType) {
      case 'login':
        return (
          <LoginModalContent
            onHide={() => setModalVisible(false)}
            onAccept={onLoginAccept}
            onResetClick={onResetClick}
          />
        );
      case 'register':
        return (
          <RegisterModalContent
            onHide={() => setModalVisible(false)}
            onAccept={onRegisterAccept}
          />
        );
      case 'reset':
        return (
          <PasswordResetModal
            onHide={() => setModalVisible(false)}
            onAccept={onResetAccept}
          />
        );
      default:
        return (<></>);
    }
  };

  return (
    <div tabIndex="-1" id="header_profile">
      {loggedIn()
        ? (
          <div id="logged-in">
            <div className="profile_links">
              <Button variant="link">{t('login.settings')}</Button>
              <span> | </span>
              <Button variant="link" onClick={onLogoutClick}>{t('login.logout')}</Button>
            </div>
            <div id="profile_pic_container">
              <div id="profile_status" />
              <img id="header_profile_pic" src="/img/logo.png" alt="Profile pic" title={globalState.loginResult.user.email} />
            </div>
          </div>
        )
        : (
          <div id="not-logged-in">
            <div className="profile_links">
              <Button variant="link" onClick={onRegisterClick}>{t('login.register')}</Button>
              <span> | </span>
              <Button variant="link" onClick={onSignInClick}>{t('login.login')}</Button>
            </div>
          </div>
        )}
      <Modal show={modalVisible} onHide={() => { setModalVisible(false); }}>
        {getModal()}
      </Modal>
    </div>
  );
};

export default Login;
