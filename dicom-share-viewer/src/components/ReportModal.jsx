import React, {useState, Fragment, useContext} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {ReportModalLoader} from "@libs/ExternalLoader";
import {CloseIcon} from "assets/icons";
import {LocaleContext, SizeContext} from "providers/contexts";

export const ReportModal = ({canvases}) => {
    const [open, setOpen] = useState(false);

    const {width} = useContext(SizeContext);
    const {t} = useContext(LocaleContext);

    const openHandler = () => setOpen(true);
    const closeHandler = () => setOpen(false);

    const isFullScreen = width < 960;

    const PrintButtonComponent = (props) => (
        <Box marginTop={2} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button {...props}>{t('print')}</Button>
        </Box>
    )

    return (
        <Fragment>
            <Dialog open={open} onClose={closeHandler} fullScreen={isFullScreen} maxWidth={'lg'}>
                <DialogTitle>
                    {t('conclusion')}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeHandler} sx={{position: 'absolute', right: 8, top: 8}}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{width: isFullScreen ? '100%' : 700}}>
                        <ReportModalLoader
                            canvases={canvases}
                            SubmitButtonComponent={PrintButtonComponent}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
            <Button onClick={openHandler}>
                {t('conclusion')}
            </Button>
        </Fragment>
    )
}