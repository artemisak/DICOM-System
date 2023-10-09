import React, {Fragment, useState, useEffect, useContext} from "react";
import {AuthContext, LocaleContext} from "providers/contexts";
import {DeleteIcon} from "assets/icons";
import {SquareIconButton} from "components/SquareIconButton";
import {styled} from "@mui/material";
import {ModalDialog} from "components/ModalDialog";
import {RequestButton} from "components/SimpleServerRequests/RequestButton";

const DeleteButtonWithOpacity = styled(SquareIconButton)({
    opacity: 0.25,
    '&: hover': {
        opacity: 1,
    }
})

export const DeleteButton = ({isVisibleFor, request, requestParams, onSuccess}) => {
    const {auth} = useContext(AuthContext);
    const {t} = useContext(LocaleContext);

    if (auth !== isVisibleFor) return null;

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Fragment>
            <DeleteButtonWithOpacity Icon={DeleteIcon} onClick={handleOpen}/>
            <ModalDialog
                width={400}
                isOpen={open}
                close={handleClose}
                header={t('are_you_sure')}
                content={(
                    <RequestButton
                        fullWidth
                        variant={'contained'}
                        request={request}
                        onSuccess={() => {
                            handleClose();
                            onSuccess && onSuccess();
                        }}
                        title={t('confirm')}
                        data={requestParams}
                    />
                )}
            />
        </Fragment>
    )
}