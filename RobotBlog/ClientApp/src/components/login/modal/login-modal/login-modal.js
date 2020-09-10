import React, { useState } from 'reactn';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import '../../login.css';
import { useTranslation } from 'react-i18next';
import AlertComponent from '../../../alert/AlertComponent';

const LoginModalContent = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onAccept(email, password);
  };

  const onCancelClick = () => {
    props.onHide();
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onResetClick = () => {
    props.onResetClick();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('login.login')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertComponent />
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>{t('login.email')}</Form.Label>
            <Form.Control type="email" value={email} onChange={onEmailChange} placeholder={t('login.enter-email')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('login.password')}</Form.Label>
            <Form.Control type="password" value={password} onChange={onPasswordChange} placeholder={t('login.password')} required />
          </Form.Group>
          <Form.Group>
            <div className="float-left forgot_password">
              {t('login.did-you-forget')}
              <span> </span>
              <Button variant="link" onClick={onResetClick}>{t('login.reset-password')}</Button>
            </div>
          </Form.Group>
          <Form.Group className="float-right">
            <Button type="button" variant="secondary" onClick={onCancelClick}>{t('login.cancel')}</Button>
            {' '}
            <Button type="submit" variant="primary">OK</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

LoginModalContent.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
};

export default LoginModalContent;
