import React from "react";
import {Box, styled} from "@mui/material";

import {EmptyIcon, ErrorIcon} from 'assets/icons'
import {grey} from "@mui/material/colors";

const CenteredBox = styled(Box)({
    maxWidth: 200,
    margin: '0 auto',
    color: grey[400]
})

export const PlaceholderImage = ({type}) => (
    <CenteredBox>
        {type === 'error' ? <ErrorIcon/> : null}
        {type === 'empty' ? <EmptyIcon/> : null}
    </CenteredBox>
)