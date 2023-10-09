import React from "react";

import {ModalDialog} from "./ModalDialog";
import {OneFieldForm} from "./OneFieldForm";

export const ModalDialogWithOneFieldForm = ({titles, isOpen, onClose, request, data, onSuccess, onError}) => {
    const {dialogTitle, fieldTitle, buttonTitle} = titles;

    return (
        <ModalDialog
            isOpen={isOpen}
            close={onClose}
            header={dialogTitle}
            content={(
                <OneFieldForm
                    buttonTitle={buttonTitle}
                    fieldTitle={fieldTitle}
                    validateOptions={{require: true, min: 0, max: 100}}
                    request={request}
                    data={data}
                    onSuccess={onSuccess}
                    onError={onError}
                />
            )}
        />
    )
}