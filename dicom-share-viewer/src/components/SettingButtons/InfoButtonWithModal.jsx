import React, {Fragment, useContext, useState} from "react";
import {DialogContentText, Link, styled} from "@mui/material";
import {ModalDialog} from "../ModalDialog";
import {SquareIconButton} from "../SquareIconButton";
import {InfoIcon} from "assets/icons";
import {LocaleContext} from "providers/contexts";

const JustifiedText = styled(DialogContentText)({
    textAlign: 'justify',
    marginBottom: 32,
})

export const InfoButtonWithModal = () => {
    const {t} = useContext(LocaleContext);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ModalContent = () => (
        <Fragment>
            <JustifiedText>
                <b>{t('app_name')}</b> - {t('app_about')}
            </JustifiedText>
            <DialogContentText>
                {`${t('feedback_info')}: `}
                <Link href="mailto:mcp.project@itmo.ru">
                    mcp.project@itmo.ru
                </Link>
            </DialogContentText>
        </Fragment>
    );


    return (
        <Fragment>
            <SquareIconButton Icon={InfoIcon} onClick={handleClickOpen}/>
            <ModalDialog
                isOpen={open}
                close={handleClose}
                header={t('info')}
                content={<ModalContent/>}
                width={400}
            />
        </Fragment>
    );
}