import React from "react";
import {Box, Card, CardActionArea, CardContent, styled} from "@mui/material";
import {FlexBox} from "components/StyledComponents";
import {TitleWithDescription} from "components/TitleWithDescription";
import {SquareIconButton} from "components/SquareIconButton";
import {ShareIcon} from "assets/icons";
import {concatNameAndDate} from "utility/concatNameAndDate";
import {DeleteButton} from "components/DeleteButton";
import {api} from "api";

const CardContentWithSmallPadding = styled(CardContent)({padding: 8});

export const FileItemCard = ({data, onSelect, openModal, isSelected, reloadFiles}) => {
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
                                request={api.delete.file}
                                requestParams={{fileId: id}}
                                onSuccess={reloadFiles}
                            />
                            <SquareIconButton Icon={ShareIcon} onClick={() => openModal(true)}/>
                        </Box>
                    ) : null}
                </FlexBox>
            </Card>
        </Box>
    )
}