import React, {Fragment, useContext, useEffect} from "react";
import {Button, Box, CircularProgress} from "@mui/material";
import {LocaleContext, SnackbarContext} from "providers/contexts";

import {FlexBoxCentered} from "../StyledComponents";
import {requestStatus} from "utility/constants";
import {useRequest} from "utility/hooks";

export const RequestButton = ({title, data, afterExecute, extraOnClick, request, onSuccess, onError, ...props}) => {
    const {showMessage} = useContext(SnackbarContext);
    const {t} = useContext(LocaleContext);

    const {data: response, status, reload} = useRequest({request, requestParams: {data}, delayedStart: true});

    useEffect(() => {
        if (status === requestStatus.READY) {
            onSuccess(response);
        }
        if (status === requestStatus.ERROR) {
            showMessage(t('request_error'));
            onError();
        }
        if (status && status !== requestStatus.LOADING) {
            afterExecute && afterExecute();
        }
    }, [status]);

    const handleOnClick = () => {
        extraOnClick ? extraOnClick() : reload();
    }

    return (
        <Fragment>
            <Button onClick={handleOnClick} {...props} disabled={status === requestStatus.LOADING}>
                {!(status === requestStatus.LOADING)? (
                    <Box>{title}</Box>
                ) : (
                    <FlexBoxCentered>
                        <Box marginRight={1}>{title}</Box>
                        <CircularProgress size={16} color={'inherit'}/>
                    </FlexBoxCentered>
                )}
            </Button>
        </Fragment>
    );
}