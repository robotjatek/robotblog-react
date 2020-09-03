import React, { useEffect, useState } from 'reactn';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Loading from '../../components/loading/loading';

const ActivateAccountPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const [inProgress, setInprogress] = useState(true);
  const [success, setSuccess] = useState();

  useEffect(() => {
    const sendActivationRequest = async () => {
      try {
        await axios.post('/api/login/activate/', { token });
        setSuccess(true);
      } catch (e) {
        setSuccess(false);
      }
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
