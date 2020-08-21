import { setGlobal } from "reactn";

export const AlertType = {
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
    DANGER: "danger"
}

class AlertService {
    showAlert = async (message, type, timeout) => {
        const alertProps = {
            message: message,
            type: type,
            show: true
        };

        setGlobal({ alertProps: alertProps });

        if (timeout > 0) {
            setTimeout(() => {
                this.hideAlert();
            }, timeout);
        }
    };

    hideAlert = () => {
        setGlobal({
            alertProps: {
                show: false
            }
        });
    };
}

const alertService = new AlertService();
export default alertService;
