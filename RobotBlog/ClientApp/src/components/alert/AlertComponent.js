import React, { useGlobal } from 'reactn';
import { Alert } from 'react-bootstrap';
import './alert-component.css';

const AlertComponent = () => {
  const [alert] = useGlobal('alertProps');

  return (
    <Alert show={alert?.show} variant={alert?.type}>{alert?.message}</Alert>
  );
};

export default AlertComponent;
