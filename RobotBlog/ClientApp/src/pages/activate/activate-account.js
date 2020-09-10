import React, { useEffect, useState } from 'reactn';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/loading/loading';
import loginService from '../../services/login/login.service';

const ActivateAccountPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const [inProgress, setInprogress] = useState(true);
  const [success, setSuccess] = useState();

  useEffect(() => {
    const sendActivationRequest = async () => {
      const result = await loginService.ActivateAccount(token);
      const requestSuccessful = result.status >= 200 && result.status < 300;
      setSuccess(requestSuccessful);

      setInprogress(false);
    };

    sendActivationRequest();
  }, [token]);

  const toShow = inProgress
    ? <Loading />
    : (
      <>
        {
          success
            ? <Alert variant="success">{t('login.activation-successful')}</Alert>
            : <Alert variant="danger">{t('login.activation-failed')}</Alert>
        }
      </>

    );

  return (
    <div>
      {toShow}
    </div>
  );
};

export default ActivateAccountPage;
