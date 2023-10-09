import React, {Fragment} from "react";
import {Box, Skeleton} from "@mui/material";

export const SkeletonItemListLoader = ({amount = 3, height = 60}) => (
    <Fragment>
        {[...Array(amount)].map((_, id) => (
            <Box marginBottom={1} key={id}>
                <Skeleton variant={'rectangular'} height={height} animation={'pulse'}/>
            </Box>
        ))}
    </Fragment>
)