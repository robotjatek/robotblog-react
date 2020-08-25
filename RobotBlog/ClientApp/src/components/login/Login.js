import React, { useState, useGlobal } from "reactn";
import "./login.css";
import { Modal, Button } from "react-bootstrap";
import LoginModalContent from "./modal/login-modal/login-modal";
import RegisterModalContent from "./modal/register-modal/register-modal"
import loginService from "../../services/login/login.service";
import { useTranslation } from "react-i18next";
import alertService, { AlertType } from "../../services/alert/alert.service";

const Login = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("login");
    const [globalState, setGlobalState] = useGlobal();
    const [t] = useTranslation();

    const loggedIn = () => {
        return globalState.loginResult != null;
    }

    const onSignInClick = () => {
        setModalVisible(true);
        setModalType("login");
    }

    const onRegisterClick = () => {
        setModalVisible(true);
        setModalType("register");
    }

    const onLogoutClick = () => {
        setGlobalState({ loginResult: null });
    }

    const onLoginAccept = async (email, password) => {
        const result = await loginService.Login(email, password);
        if (result) {
            setGlobalState({ loginResult: result });
            setModalVisible(false);
        } else {
            alertService.showAlert(t("login.failed"), AlertType.DANGER, 5000);
        }
    }

    const onRegisterAccept = async (email, password) => {
        const result = await loginService.Register(email, password);
        if (result) {
            setModalVisible(false);
        } else {
            alertService.showAlert(t("login.registration-failed"), AlertType.DANGER, 5000);
        }
    }

    return (
        <div tabIndex="0" id="header_profile">
            {loggedIn() ?
                <div id="logged-in">
                    <div className="profile_links">
                        <Button variant="link">{t("login.settings")}</Button>
                        <span> | </span>
                        <Button variant="link" onClick={onLogoutClick}>{t("login.logout")}</Button>
                    </div>
                    <div id="profile_pic_container">
                        <div id="profile_status"></div>
                        <img id="header_profile_pic" src="/img/logo.png" alt="Profile pic" title={globalState.loginResult.user.email} />
                    </div>
                </div> :
                <div id="not-logged-in">
                    <div className="profile_links">
                        <Button variant="link" onClick={onRegisterClick}>{t("login.register")}</Button>
                        <span> | </span>
                        <Button variant="link" onClick={onSignInClick}>{t("login.login")}</Button>
                    </div>
                </div>
            }
            <Modal show={modalVisible} onHide={() => { setModalVisible(false) }}>
                {modalType === "login" ?
                    <LoginModalContent onHide={() => setModalVisible(false)} onAccept={onLoginAccept} /> :
                    <RegisterModalContent onHide={() => setModalVisible(false)} onAccept={onRegisterAccept} />
                }
            </Modal>
        </div >
    )
}

export default Login;
