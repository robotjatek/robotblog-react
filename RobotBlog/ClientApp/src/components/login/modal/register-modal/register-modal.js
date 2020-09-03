import React, { useState } from 'reactn';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AlertComponent from '../../../alert/AlertComponent';

const RegisterModalContent = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('hu');
  const { t } = useTranslation();

  const isPasswordValid = () => passwordConfirm === password;

  const onSubmit = (event) => {
    event.preventDefault();
    if (isPasswordValid()) {
      props.onAccept(email, password, username, language);
    }
  };

  const onCancel = () => {
    props.onHide();
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onPasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('login.register')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertComponent />
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>{t('login.email')}</Form.Label>
            <Form.Control type="email" value={email} onChange={onEmailChange} placeholder={t('login.enter-email')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('login.username')}</Form.Label>
            <Form.Control type="text" value={username} onChange={onUsernameChange} placeholder={t('login.username')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('login.password')}</Form.Label>
            <Form.Control type="password" value={password} onChange={onPasswordChange} placeholder={t('login.password')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('login.password-confirmation')}</Form.Label>
            <Form.Control isInvalid={!isPasswordValid()} type="password" value={passwordConfirm} onChange={onPasswordConfirmChange} placeholder={t('login.password-confirmation')} required />
            <Form.Control.Feedback type="invalid">{t('login.please-match-passwords')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('login.preferred-language')}</Form.Label>
            <Form.Control as="select" value={language} onChange={onLanguageChange}>
              <option value="hu">hu</option>
              <option value="en">en</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="float-right">
            <Button type="button" variant="secondary" onClick={onCancel}>{t('login.cancel')}</Button>
            {' '}
            <Button type="submit" variant="primary">OK</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

RegisterModalContent.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default RegisterModalContent;
