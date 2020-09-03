import React, { useGlobal, useEffect } from 'reactn';
import { Alert } from 'react-bootstrap';
import './alert-component.css';

const AlertComponent = () => {
  const [alertProps, setAlertProps] = useGlobal('alertProps');

  useEffect(() => {
    if (alertProps?.show) {
      setTimeout(() => {
        setAlertProps(null);
      }, 5000);
    }
  }, []); // TODO: remove this hack when reactn-persist blacklist gets implemented

  return (
    alertProps?.show
      ? <Alert show={alertProps?.show} variant={alertProps?.type}>{alertProps?.message}</Alert>
      : <></>
  );
};

export default AlertComponent;
