import React, {Fragment, useState} from "react";
import {Box, Grow} from "@mui/material";
import {routes} from "utility/constants";
import {ModalDialogWithOneFieldForm} from "components/ModalDialogWithOneFieldForm";
import {api} from "api/index";
import {Viewer} from "components/Viewer";
import {FileItemCard} from "pages/FilesPage/FileItemCard";
import {PlaceholderImage} from "components/PlaceholderImage";

export const FilesList = ({data, navigate, selected, setSelected, reload, t}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const files = data || [];

    const reloadHandler = () => {
        setSelected(null);
        reload()
    }

    return (
        <Fragment>
            {files?.length ? (
                <Fragment>
                    {files.map((file, id) => (
                        <Grow in={!selected || selected.id === file.id} key={id} unmountOnExit>
                            <Box>
                                <FileItemCard
                                    data={file}
                                    onSelect={setSelected}
                                    openModal={setModalIsOpen}
                                    isSelected={Boolean(selected && selected.id === file.id)}
                                    reloadFiles={reloadHandler}
                                />
                            </Box>
                        </Grow>
                    ))}
                </Fragment>
            ) : (
                <Box marginTop={3}>
                    <PlaceholderImage type={'empty'}/>
                </Box>
            )}
            <Grow in={Boolean(selected)} unmountOnExit>
                <Box marginTop={2}>
                    {selected ? (
                        <Fragment>
                            <Viewer fileId={selected.id} withResearches={true}/>
                            <ModalDialogWithOneFieldForm
                                titles={{dialogTitle: t('new_discussion'), buttonTitle: t('create')}}
                                isOpen={modalIsOpen}
                                onClose={() => setModalIsOpen(false)}
                                request={api.post.discussion_create}
                                data={{fileId: selected.id}}
                                onSuccess={() => navigate(`../${routes.discussions}`)}
                            />
                        </Fragment>
                    ) : null}
                </Box>
            </Grow>
        </Fragment>
    )
}
