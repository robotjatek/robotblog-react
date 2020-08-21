import React, { useState } from "reactn";
import { Modal, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AlertComponent from "../../../alert/AlertComponent";

const RegisterModalContent = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation();

    const onSubmit = (event) => {
        event.preventDefault();
        props.onAccept(email, password);
    }

    const onCancel = () => {
        props.onHide();
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{t("login.register")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlertComponent />
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>{t("login.email")}</Form.Label>
                        <Form.Control type="email" value={email} onChange={onEmailChange} placeholder={t("login.enter-email")} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t("login.password")}</Form.Label>
                        <Form.Control type="password" value={password} onChange={onPasswordChange} placeholder={t("login.password")} required />
                    </Form.Group>
                    <Form.Group className="float-right">
                        <Button type="button" variant="secondary" onClick={onCancel}>{t("login.cancel")}</Button>
                        {' '}
                        <Button type="submit" variant="primary">OK</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </>
    )
}

export default RegisterModalContent;
