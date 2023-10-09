import React, {useMemo, useState, Fragment} from "react";
import {Button} from "@mui/material";
import {ModalDialogWithOneFieldForm} from 'components/ModalDialogWithOneFieldForm';
import {api} from "api/index";

export const UploadButton = ({file, markup, fileId, setFileId, setMarkupId, discussionId, t}) => {
    const [isOpen, setIsOpen] = useState(false);

    const config = useMemo(() => {
        return !fileId
            ? {
                title: t('upload_file'),
                request: api.post.file,
                data: {file},
                onSuccess: ({id}) => setFileId(id)
            }
            : {
                title: t('upload_research'),
                request: api.post.research,
                data: {fileId, research: markup, discussionId},
                onSuccess: ({id}) => setMarkupId(id)
            }
        }, [fileId, discussionId, file, JSON.stringify(markup)]);

    if (!file || (fileId && !markup)) return null;

    return (
        <Fragment>
            <ModalDialogWithOneFieldForm
                data={config.data}
                request={config.request}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                titles={{
                    dialogTitle: config.title,
                    buttonTitle: t('save'),
                }}
                onError={() => setIsOpen(false)}
                onSuccess={({id}) => {
                    setIsOpen(false);
                    config.onSuccess({id});
                }}
            />
            <Button onClick={() => setIsOpen(true)}>
                {config.title}
            </Button>
        </Fragment>
    );
}