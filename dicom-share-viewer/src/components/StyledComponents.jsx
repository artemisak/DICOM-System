import {Box, Typography, Paper, styled} from "@mui/material";

export const FlexBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

export const TypographyBold = styled(Typography)({
    fontWeight: 'bold'
});

export const FlexBoxCentered = styled(Box)({
    display: 'flex',
    alignItems: 'center'
});

export const RoundedPaper = styled(Paper)({
    borderRadius: 8,
    overflow: 'hidden'
});

export const TypographyPointer = styled(Typography)({
    cursor: 'pointer',
    margin: '0 4px'
});