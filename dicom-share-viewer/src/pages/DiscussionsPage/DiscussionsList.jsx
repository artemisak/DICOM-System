import React, {Fragment, useState} from "react";
import {Box, ToggleButtonGroup, ToggleButton, styled, Grow} from "@mui/material";
import {Viewer} from "components/Viewer";
import {DiscussionItemCard} from "./DiscussionItemCard";
import {PlaceholderImage} from "components/PlaceholderImage";
import {Chat} from "./Chat";
import {MembersManage} from "pages/DiscussionsPage/MembersManage";

const ToggleButtonGroupRounded = styled(ToggleButtonGroup)({
    '& > *': {borderRadius: 0},
    '& > *: first-of-type': {borderRadius: '4px 0 0 4px'},
    '& > *: last-of-type': {borderRadius: '0 4px 4px 0px'},
})

const modes = {
    'file': 'file',
    'chat': 'chat',
}

export const DiscussionsList = ({data, t, selected, setSelected, reload}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [mode, setMode] = useState(modes.file);

    const discussions = data || [];

    const reloadDiscussionsHandler = () => {
        setSelected(null);
        reload();
    }

    return (
        <Fragment>
            {discussions?.length ? (
                <Fragment>
                    {discussions.map((discussion, id) => (
                        <Grow in={!selected || selected.id === discussion.id} key={id} unmountOnExit>
                            <Box>
                                <DiscussionItemCard
                                    data={discussion}
                                    onSelect={setSelected}
                                    openModal={setModalIsOpen}
                                    isSelected={Boolean(selected && selected.id === discussion.id)}
                                    reloadDiscussions={reloadDiscussionsHandler}
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
                            <Box marginBottom={2}>
                                <ToggleButtonGroupRounded
                                    color="primary"
                                    value={mode}
                                    exclusive
                                    fullWidth
                                    onChange={e => setMode(e?.target?.value)}
                                    size={'small'}
                                >
                                    <ToggleButton value={modes.file} fullWidth>{t('file')}</ToggleButton>
                                    <ToggleButton value={modes.chat} fullWidth>{t('chat')}</ToggleButton>
                                </ToggleButtonGroupRounded>
                            </Box>
                            {mode === modes.file ? (
                                <Viewer fileId={selected.fileId} withResearches={true} discussionId={selected.id}/>
                            ) : null}
                            {mode === modes.chat ? (
                                <Chat discussionId={selected.id} t={t}/>
                            ) : null}
                            <MembersManage
                                discussionId={selected.id}
                                isOpen={modalIsOpen}
                                close={() => setModalIsOpen(false)}
                                creatorId={selected.userId}
                                t={t}
                                reloadDiscussions={reloadDiscussionsHandler}
                            />
                        </Fragment>
                    ) : null}
                </Box>
            </Grow>
        </Fragment>
    )
}
