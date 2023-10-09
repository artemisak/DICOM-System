import React from "react";
import {Dialog, DialogTitle, DialogContent} from "@mui/material";

export const ModalDialog = ({isOpen, close, header, content, width = 400}) => (
    <Dialog
        open={isOpen}
        onClose={close}
        scroll={'paper'}
        transitionDuration={{exit: 0}}
        fullWidth
        PaperProps={{sx: {maxWidth: width, position: 'absolute', top: 120}}}
    >
        {header ? (
            <DialogTitle>{header}</DialogTitle>
        ): null}
        {content ? (
            <DialogContent>
                {content}
            </DialogContent>
        ) : null}
    </Dialog>
);