import React, {Fragment, useState} from "react";
import {HeaderWithButton} from "components/HeaderWithButton";
import {ModalDialogWithOneFieldForm} from "components/ModalDialogWithOneFieldForm";
import {api} from "api";

export const Header = ({t}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModalHandler = () => setModalIsOpen(true);
    const closeModalHandler = () => setModalIsOpen(false);

    return (
        <Fragment>
            <HeaderWithButton
                title={t('my_discussions')}
                buttonText={t('join_discussion')}
                buttonOnClick={openModalHandler}
            />
            <ModalDialogWithOneFieldForm
                titles={{dialogTitle: t('join_discussion'), buttonTitle: t('join')}}
                isOpen={modalIsOpen}
                onClose={closeModalHandler}
                request={api.post.discussion_join}
                onSuccess={closeModalHandler}
            />
        </Fragment>
    )
}