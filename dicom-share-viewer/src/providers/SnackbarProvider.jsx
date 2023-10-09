import React, {useState} from 'react';

import {SnackbarContext} from './contexts';
import {Snackbar, styled} from "@mui/material";

const SnackbarWithZIndex = styled(Snackbar)({
    zIndex: 5000
});

export const SnackbarProvider = ({children}) => {
    const [message, setMessage] = useState(null);

    const showMessage = (msg) => setMessage(msg);

    return (
        <SnackbarContext.Provider value={{showMessage}}>
            {children}
            <SnackbarWithZIndex
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={!!message}
                onClose={() => setMessage(null)}
                message={message}
                autoHideDuration={2000}
            />
        </SnackbarContext.Provider>
    )
}