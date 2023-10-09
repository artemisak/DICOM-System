import React from "react";
import {Box, Card, CardActionArea, CardContent, styled} from "@mui/material";
import {FlexBox} from "components/StyledComponents";
import {TitleWithDescription} from "components/TitleWithDescription";
import {SquareIconButton} from "components/SquareIconButton";
import {concatNameAndDate} from "utility/concatNameAndDate";
import {GroupAdd} from "@mui/icons-material";
import {DeleteButton} from "components/DeleteButton";
import {api} from "api/index";

const CardContentWithSmallPadding = styled(CardContent)({padding: 8});

export const DiscussionItemCard = ({data, onSelect, openModal, isSelected, reloadDiscussions}) => {
    const {id, title, userName, userId, date} = data;

    return (
        <Box marginBottom={1}>
            <Card>
                <FlexBox>
                    <CardActionArea onClick={() => onSelect(data)} disabled={isSelected}>
                        <CardContentWithSmallPadding>
                            <Box paddingX={1}>
                                <TitleWithDescription
                                    title={title}
                                    description={concatNameAndDate(userName, date)}
                                />
                            </Box>
                        </CardContentWithSmallPadding>
                    </CardActionArea>
                    {isSelected ? (
                        <Box style={{display: 'flex'}} paddingX={1}>
                            <DeleteButton
                                isVisibleFor={userId}
                                request={api.delete.discussion}
                                requestParams={{discussionId: id}}
                                onSuccess={() => reloadDiscussions()}
                            />
                            <SquareIconButton Icon={GroupAdd} onClick={() => openModal(true)}/>
                        </Box>
                    ) : null}
                </FlexBox>
            </Card>
        </Box>
    )
}