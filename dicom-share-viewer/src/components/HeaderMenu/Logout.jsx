import React, {Fragment} from "react";
import {DialogContentText, Button, Box} from "@mui/material";

export const Logout = ({t, handleLogout}) => (
    <Fragment>
        <DialogContentText>
            {t('logout_confirm')}
        </DialogContentText>
        <Box marginTop={4}>
            <Button onClick={handleLogout} color={'primary'} variant={'contained'} fullWidth>
                {t('logout')}
            </Button>
        </Box>
    </Fragment>
);
