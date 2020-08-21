import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../../login.css";
import { useTranslation } from "react-i18next";
import AlertComponent from "../../../alert/AlertComponent";

const LoginModalContent = (props) => {
    const onSubmit = (event) => {
        event.preventDefault();
        props.onAccept(email, password);
    }

    const onCancelClick = () => {
        props.onHide();
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{t("login.login")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlertComponent />
                <Form onSubmit={onSubmit} >
                    <Form.Group>
                        <Form.Label>{t("login.email")}</Form.Label>
                        <Form.Control type="email" value={email} onChange={onEmailChange} placeholder={t("login.enter-email")} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t("login.password")}</Form.Label>
                        <Form.Control type="password" value={password} onChange={onPasswordChange} placeholder={t("login.password")} required />
                    </Form.Group>
                    <Form.Group className="float-right">
                        <Button type="button" variant="secondary" onClick={onCancelClick}>{t("login.cancel")}</Button>
                        {' '}
                        <Button type="submit" variant="primary">OK</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </>
    );
}

export default LoginModalContent;
