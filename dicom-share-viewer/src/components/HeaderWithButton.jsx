import React from "react";
import {Button, Typography} from "@mui/material";
import {FlexBox} from "components/StyledComponents";

export const HeaderWithButton = ({title, buttonText, buttonOnClick}) => (
    <FlexBox marginBottom={2}>
        <Typography variant={'h5'}>{title}</Typography>
        <Button variant={'contained'} color={'primary'} onClick={buttonOnClick}>
            {buttonText}
        </Button>
    </FlexBox>
)