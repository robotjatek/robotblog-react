import { setGlobal } from 'reactn';

export const AlertType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  DANGER: 'danger',
};

class AlertService {
  showAlert = (message, type, timeout) => {
    const alertProps = {
      message,
      type,
      show: true,
    };

    setGlobal({ alertProps });

    if (timeout > 0) {
      setTimeout(() => {
        this.hideAlert();
      }, timeout);
    }
  };

  hideAlert = () => {
    setGlobal({
      alertProps: {
        show: false,
      },
    });
  };
}

const alertService = new AlertService();
export default alertService;
