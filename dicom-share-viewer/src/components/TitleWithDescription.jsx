import React, {Fragment} from "react";
import {TypographyBold} from "components/StyledComponents";
import {Typography} from "@mui/material";

export const TitleWithDescription = ({title, description}) => (
    <Fragment>
        <TypographyBold variant={'body1'} color={'textSecondary'}>
            {title}
        </TypographyBold>
        <Typography variant={'caption'} color={'textSecondary'}>
            {description}
        </Typography>
    </Fragment>
)