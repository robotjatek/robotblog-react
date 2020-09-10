import React, { useState } from 'reactn';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AlertComponent from '../../../alert/AlertComponent';

const PasswordResetModal = (props) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    props.onAccept(email);
  };

  const onCancelClick = () => {
    props.onHide();
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('login.reset-password')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertComponent />
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>{t('login.email')}</Form.Label>
            <Form.Control type="email" value={email} onChange={onEmailChange} placeholder={t('login.enter-email')} required />
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

PasswordResetModal.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default PasswordResetModal;
