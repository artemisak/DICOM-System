import React from "react";
import {IconButton, styled} from "@mui/material";

const IconButtonStyled = styled(IconButton)({
    boxSizing: 'border-box',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    overflow: 'hidden',
    margin: 2,
    padding: 8,
    borderRadius: 8,
})

export const SquareIconButton = ({Icon, onClick, isActive, ...props}) => (
    <IconButtonStyled onClick={onClick} color={isActive ? 'primary' : 'secondary'} {...props}>
        <Icon/>
    </IconButtonStyled>
)