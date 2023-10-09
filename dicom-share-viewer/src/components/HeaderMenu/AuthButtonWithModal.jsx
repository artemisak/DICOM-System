import React, {Fragment, useState} from "react";
import {ModalDialog} from "../ModalDialog";
import {SquareIconButton} from "../SquareIconButton";
import {LogoutIcon, LoginIcon} from "assets/icons";
import {Logout} from "./Logout";
import {Login} from "./Login";

export const AuthButtonWithModal = ({auth, login, logout, t}) => {
    const [open, setOpen] = useState(false);

    const [hasAccount, setHasAccount] = useState(true);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        handleClose();
        logout();
    };

    const handleLogin = (data = {}) => {
        const {id} = data;
        if (id) {
            handleClose();
            login(id);
        }
    }

    const title = auth ? 'logout' : hasAccount ?'login' : 'register';

    return (
        <Fragment>
            <SquareIconButton
                Icon={auth ? LogoutIcon : LoginIcon}
                onClick={handleClickOpen}
            />
            <ModalDialog
                isOpen={open}
                close={handleClose}
                header={t(title)}
                content={
                    auth ? (
                        <Logout
                            handleLogout={handleLogout}
                            t={t}
                        />
                    ) : (
                        <Login
                            onSubmit={handleLogin}
                            hasAccount={hasAccount}
                            setHasAccount={setHasAccount}
                            t={t}
                        />
                    )}
            />
        </Fragment>
    );
}