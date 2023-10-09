import React, {useState} from "react";
import {Box} from "@mui/material";
import {Underlay} from "components/Underlay";
import {OneFieldForm} from "components/OneFieldForm";
import {api} from "api";
import {DataLoader} from "components/SimpleServerRequests/DataLoader";
import {SkeletonItemListLoader} from "components/SkeletonItemListLoader";
import {ChatMessageList} from "./ChatMessageList";

const LoaderComponent = () => <SkeletonItemListLoader height={42}/>

export const Chat = ({discussionId, t}) => {
    const [lastMessage, setLastMessage] = useState(null);

    return (
        <Underlay>
            <Box padding={2}>
                <Box marginBottom={3}>
                    <OneFieldForm
                        data={{discussionId}}
                        fieldTitle={t('message')}
                        buttonTitle={t('send')}
                        request={api.post.discussion_comment}
                        validateOptions={{require: true, min: 0, max: 100}}
                        onSuccess={({id}) => setLastMessage(id)}
                    />
                </Box>
                <DataLoader
                    request={api.get.discussion_comments}
                    requestParams={{discussionId}}
                    baseProps={{lastMessage}}
                    RenderComponent={ChatMessageList}
                    LoaderComponent={LoaderComponent}
                    showContentDuringLoading
                />
            </Box>
        </Underlay>
    )
}