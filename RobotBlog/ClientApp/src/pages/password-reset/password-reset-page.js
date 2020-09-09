import React from 'reactn';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import loginService from '../../services/login/login.service';
import AlertComponent from '../../components/alert/AlertComponent';
import alertService, { AlertType } from '../../services/alert/alert.service';

const PasswordResetPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const isPasswordValid = () => password === passwordConfirmation && password.length > 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordValid()) {
      const result = await loginService.ResetWithToken(token, password);
      if (result.status >= 200 && result.status < 300) {
        alertService.showAlert(t('login.reset-successful'), AlertType.SUCCESS, 5000);
      } else {
        alertService.showAlert(t('login.reset-failed'), AlertType.DANGER, 5000);
      }
    }
  };

  return (
    <>
      <AlertComponent />
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>{t('login.password')}</Form.Label>
          <Form.Control type="password" value={password} onChange={onPasswordChange} placeholder={t('login.password')} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('login.password-confirmation')}</Form.Label>
          <Form.Control isInvalid={!isPasswordValid()} type="password" value={passwordConfirmation} onChange={onPasswordConfirmationChange} placeholder={t('login.password-confirmation')} required />
          <Form.Control.Feedback type="invalid">{t('login.please-match-passwords')}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="primary">OK</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default PasswordResetPage;
