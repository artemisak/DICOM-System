import React, {useContext} from "react";
import {ModalDialog} from "components/ModalDialog";
import {FlexBox} from "components/StyledComponents";
import {AuthContext, SnackbarContext} from "providers/contexts";
import {Typography, Button} from "@mui/material";
import {DataLoader} from "components/SimpleServerRequests/DataLoader";
import {api} from "api/index";
import {MembersManageContent} from "./MembersManageContent";

export const MembersManage = ({creatorId, isOpen, close, discussionId, t, reloadDiscussions}) => {
    const {showMessage} = useContext(SnackbarContext);
    const {auth} = useContext(AuthContext);

    const copyDiscussionId = () => {
        navigator.clipboard.writeText(discussionId).then(() => showMessage(t('copied_id')))
    }

    return (
        <ModalDialog
            isOpen={isOpen}
            close={() => close()}
            header={(
                <FlexBox>
                    <Typography variant={'h6'}>
                        {t('members')}
                    </Typography>
                    <Button variant={'outlined'} onClick={copyDiscussionId}>
                        {t('copy_room_id')}
                    </Button>
                </FlexBox>
            )}
            content={(
                <DataLoader
                    RenderComponent={MembersManageContent}
                    request={api.get.discussion_accesses}
                    requestParams={{discussionId}}
                    baseProps={{discussionId, isCreator: auth === creatorId, close, t, reloadDiscussions}}
                />
            )}
        />
    )
}