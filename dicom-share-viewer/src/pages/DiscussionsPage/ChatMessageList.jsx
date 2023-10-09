import React, {useEffect, Fragment} from "react";
import {Box, Typography} from "@mui/material";
import {PlaceholderImage} from "components/PlaceholderImage";
import {FlexBox} from "components/StyledComponents";
import {concatNameAndDate} from "utility/concatNameAndDate";
import {DeleteButton} from "components/DeleteButton";
import {api} from "api";

export const ChatMessageList = (props) => {
    const {data, lastMessage, reload} = props;
    const comments = data || [];

    useEffect(() => lastMessage && reload(), [lastMessage]);

    return (
        <Fragment>
            {comments?.length ? (
                <Fragment>
                    {comments.map(({id, userName, userId, date, text}) => (
                        <FlexBox key={id} marginY={1}>
                            <Box>
                                <Typography variant={'caption'} color={'secondary'}>
                                    {concatNameAndDate(userName, date)}
                                </Typography>
                                <Typography variant={'body1'}>
                                    {text}
                                </Typography>
                            </Box>
                            <Box>
                                <DeleteButton
                                    isVisibleFor={userId}
                                    request={api.delete.discussion_comment}
                                    requestParams={{commentId: id}}
                                    onSuccess={() => reload()}
                                />
                            </Box>
                        </FlexBox>
                    ))}
                </Fragment>
            ) : (
                <Box marginTop={3}>
                    <PlaceholderImage type={'empty'}/>
                </Box>
            )}
        </Fragment>
    );
}
