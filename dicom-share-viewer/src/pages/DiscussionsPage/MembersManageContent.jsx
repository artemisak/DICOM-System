import React, {Fragment, useState} from "react";
import {Box, Divider, styled} from "@mui/material";
import {FlexBox, TypographyBold} from "components/StyledComponents";
import {ClearIcon, DoneIcon} from "assets/icons";
import {green, red} from "@mui/material/colors";
import {RequestButton} from "components/SimpleServerRequests/RequestButton";
import {api} from "api";

const SmallIconButton = styled(Box)({
    cursor: 'pointer',
    marginLeft: 8
})

export const MembersManageContent = ({data, discussionId, isCreator, t, close, reloadDiscussions}) => {
    const accesses = data || [];

    const [allow, setAllow] = useState([]);
    const [deny, setDeny] = useState([]);

    const allowAddHandler = (data) => setAllow([...allow, data]);
    const allowRemoveHandler = (data) => setAllow(allow.filter(item => item.id !== data.id));

    const denyAddHandler = (data) => setDeny([...deny, data]);
    const denyRemoveHandler = (data) => setDeny(deny.filter(item => item.id !== data.id));

    const changeList = [...allow.map(({id}) => id), ...deny.map(({id}) => id)];

    const creator = [], participants = [], requests = [];

    accesses.forEach(access => {
        const {id, permission} = access;
        if (!changeList.includes(id)) {
            switch (permission) {
                case 0:
                    return creator.push(access);
                case 1:
                    return participants.push(access);
                case 2:
                    return requests.push(access);
            }
        }
    })

    return (
        <Box>
            {creator.length ? (
                <Box marginBottom={2}>
                    <TypographyBold>{t('creator')}</TypographyBold>
                    {creator.map(({id, userName}) => <Box key={id}>{userName}</Box>)}
                </Box>
            ) : null}
            {participants.length ? (
                <Box marginBottom={2}>
                    <TypographyBold>{t('participants')}</TypographyBold>
                    {participants.map(({id, userName}) => (
                        <FlexBox key={id}>
                            {userName}
                            {isCreator ? (
                                <SmallIconButton onClick={() => denyAddHandler({id, userName})}>
                                    <ClearIcon/>
                                </SmallIconButton>
                            ) : null}
                        </FlexBox>
                    ))}
                </Box>
            ) : null}
            {requests.length ? (
                <Box marginBottom={2}>
                    <TypographyBold>{t('requests')}</TypographyBold>
                    {requests.map(({id, userName}) => (
                        <FlexBox key={id}>
                            {userName}
                            {isCreator ? (
                                <FlexBox>
                                    <SmallIconButton onClick={() => allowAddHandler({id, userName})}>
                                        <DoneIcon/>
                                    </SmallIconButton>
                                    <SmallIconButton onClick={() => denyAddHandler({id, userName})}>
                                        <ClearIcon/>
                                    </SmallIconButton>
                                </FlexBox>
                            ) : null}
                        </FlexBox>
                    ))}
                </Box>
            ) : null}
            {isCreator && changeList.length ? (
                <Fragment>
                    <Box marginBottom={2}>
                        <Divider/>
                    </Box>
                    {allow.length ? (
                        <Box marginBottom={2}>
                            <TypographyBold color={green[800]}>{t('allow')}</TypographyBold>
                            {allow.map(({id, userName}) => (
                                <FlexBox key={id}>
                                    {userName}
                                    <SmallIconButton onClick={() => allowRemoveHandler({id})}>
                                        <ClearIcon/>
                                    </SmallIconButton>
                                </FlexBox>
                            ))}
                        </Box>
                    ) : null}
                    {deny.length ? (
                        <Box marginBottom={2}>
                            <TypographyBold color={red[700]}>{t('deny')}</TypographyBold>
                            {deny.map(({id, userName}) => (
                                <FlexBox key={id}>
                                    {userName}
                                    <SmallIconButton onClick={() => denyRemoveHandler({id})}>
                                        <ClearIcon/>
                                    </SmallIconButton>
                                </FlexBox>
                            ))}
                        </Box>
                    ) : null}
                    {changeList.length ? (
                        <RequestButton
                            request={api.post.discussion_accesses}
                            title={t('submit_changes')}
                            onSuccess={() => close()}
                            data={{
                                allow: allow.map(item => item.id),
                                deny: deny.map(item => item.id),
                                discussionId
                            }}
                            variant={'contained'}
                            fullWidth
                        />
                    ) : null}
                </Fragment>
            ) : null}
            {!isCreator ? (
                <RequestButton
                    request={api.post.discussion_leave}
                    title={t('leave_discussion')}
                    onSuccess={() => {
                        close();
                        reloadDiscussions();
                    }}
                    data={{discussionId}}
                    variant={'contained'}
                    fullWidth
                />
            ) : null}
        </Box>
    )
}